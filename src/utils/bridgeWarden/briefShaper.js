// THE BRIEF SHAPER ENGINE
// This module intercepts internal seat requests and formats them according
// to the external tool's capability map and preferred templates.

import { supabase } from '../lib/supabaseClient';

export class BriefShaper {
  
  /**
   * Main entry point for shaping a brief before external dispatch.
   * @param {string} fromSeat - The internal AI requesting the work (e.g., 'merlin')
   * @param {string} toTool - The target external tool (e.g., 'emergent')
   * @param {object} taskPayload - The raw task request
   * @returns {object} - The shaped prompt and provenance envelope
   */
  static async shapeDispatch(fromSeat, toTool, taskPayload) {
    // 1. Fetch Tool Capabilities & Trust Tier
    const { data: tool, error } = await supabase
      .from('lake.bridge_tools')
      .select('trust_tier, capability_map')
      .eq('id', toTool)
      .single();

    if (error || !tool) throw new Error(`Tool ${toTool} not found or offline.`);

    // 2. Enforce Data Fence based on Trust Tier
    const sanitizedPayload = this.enforceDataFence(taskPayload, tool.trust_tier);

    // 3. Apply the Tool-Specific Template
    const shapedPrompt = this.applyTemplate(toTool, sanitizedPayload, tool.capability_map);

    // 4. Generate Provenance Envelope
    const envelope = {
      from_seat: fromSeat,
      to_tool: toTool,
      trust_tier_at_dispatch: tool.trust_tier,
      outbound: {
        ts: new Date().toISOString(),
        shaped_brief: shapedPrompt,
        data_classes_included: sanitizedPayload.data_classes,
        data_fence_check_passed: true
      },
      status: 'prepared'
    };

    return { shapedPrompt, envelope };
  }

  /**
   * Enforces security boundaries. Strips PII if tool is not Allied.
   */
  static enforceDataFence(payload, trustTier) {
    let safePayload = { ...payload };

    if (trustTier === 'quarantined') {
      throw new Error("DISPATCH BLOCKED: Target tool is Quarantined.");
    }

    if (trustTier === 'friendly' || trustTier === 'probationary') {
      // Strip real claimant data, enforce synthetic replacements
      if (safePayload.contains_pii) {
        console.warn("BRIDGE WARDEN: Stripping PII for non-Allied dispatch.");
        safePayload.claimant_name = "[REDACTED_FOR_FRIENDLY_TIER]";
        safePayload.case_number = "DA-TEST-0000";
        safePayload.data_classes = safePayload.data_classes.filter(c => c !== 'real_claimant_data');
      }
    }

    return safePayload;
  }

  /**
   * Compiles the final text prompt matching the external tool's required format.
   */
  static applyTemplate(toolId, payload, capabilityMap) {
    const baseHeader = `SESSION: KoRT DRT Build Request\nDATE: ${new Date().toISOString().split('T')[0]}\nFROM: kort@drt.onl\n`;
    
    // Inject KoRT standard credentials/palette automatically
    const kortContext = `
SUPABASE PROJECT: skfxkjshsnvimdeirfec
DESIGN: Dragon Shield palette (#08080f bg, #c9a84c gold, #0033a0 blue)
FONT: Cinzel headings, Crimson Text body
`;

    if (toolId === 'emergent') {
      return `${baseHeader}${kortContext}\nBUILD TARGET: ${payload.title}\n\nREQUIREMENTS:\n${payload.requirements}\n\nACCEPTANCE CRITERIA:\n${payload.acceptance.map(a => `- [ ] ${a}`).join('\n')}`;
    }

    if (toolId === 'base44') {
      return `${baseHeader}\nCOMPONENT SPEC: ${payload.title}\n\nUI/UX RULES:\n${kortContext}\n\nLOGIC:\n${payload.requirements}`;
    }

    // Default fallback
    return `${baseHeader}\nTASK: ${payload.title}\n\nCONTEXT:\n${kortContext}\n\nDETAILS:\n${payload.requirements}`;
  }
}

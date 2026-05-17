# Changelog

All notable changes to the KoRT Command Center and DRT ecosystem will be documented in this file.

## [Unreleased]
### Added
- Created Digital Dollars Launch Strategy (`Digital_Dollars_Launch_Strategy.md`).
- Added proper SEO tags and Open Graph metadata to `apps/claude-export-hub/index.html`.
- Updated `KORT_MASTER_PORTAL.html` to reflect the Live status of Claude Export Hub, Digital Dollars, and Digital Advocate.
- Updated `scripts/KoRT_Claw_Workshop.js` to send payloads to Workshop.ai sequentially instead of in a single block.

### Fixed
- Fixed Flutter dependencies in `apps/dollars/pubspec.yaml` (removed placeholder and hypothetical versions) to unblock web builds.
- Ensured no existing work was regenerated. All additions are additive.

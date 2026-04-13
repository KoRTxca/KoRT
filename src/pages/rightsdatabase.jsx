import React, { useState } from 'react'
import { BookOpen, Search, ChevronDown, ChevronUp } from 'lucide-react'

const CATEGORIES = {
  tenant:   { label: 'Tenant Rights',        emoji: '🏠', color: '#22c55e' },
  worker:   { label: 'Worker Rights',         emoji: '💼', color: '#4a90d9' },
  police:   { label: 'Police Encounters',     emoji: '🚔', color: '#ef4444' },
  benefits: { label: 'Benefits & Assistance', emoji: '📋', color: '#f97316' },
  medical:  { label: 'Medical Rights',        emoji: '🏥', color: '#a855f7' },
};

const RIGHTS_DATA = [
  { cat: 'tenant',   title: 'Your landlord CANNOT enter without 24 hours written notice', content: 'Under the BC Residential Tenancy Act (RTA), your landlord must give you 24 hours written notice before entering your unit, and can only enter between 8am-9pm. Exceptions: emergency, or you gave permission. If they violate this, document it and file a dispute with the Residential Tenancy Branch (RTB).' },
  { cat: 'tenant',   title: 'Rent increases are limited and regulated', content: 'In BC, landlords can only increase rent once per year, with 3 months written notice, by the maximum amount set by the province (usually inflation-based). Any increase above this is illegal unless approved by the RTB. You do NOT have to pay an illegal increase.' },
  { cat: 'tenant',   title: 'You cannot be evicted without proper cause', content: 'Your landlord needs a valid legal reason to evict you (non-payment, breach of agreement, landlord use, etc.) and must follow the proper process including written notice with specific timelines. A verbal "you have to leave" is NOT an eviction. Know your notice periods: 10 days for non-payment, 1 month for cause, 2 months for landlord use.' },
  { cat: 'tenant',   title: 'Security deposits: what they can and cannot keep', content: "Maximum deposit is half a month's rent. Landlord must return it within 15 days of tenancy ending, with receipts for any deductions. Normal wear and tear is NOT deductible. If they don't return it in time, you can claim double through the RTB." },
  { cat: 'tenant',   title: 'How to file a dispute with the RTB', content: "Go to gov.bc.ca/landlordtenant. Filing fee is $100 (can request fee waiver). You'll get a hearing (usually phone). Bring all evidence: photos, texts, emails, lease. The arbitrator's decision is legally binding." },
  { cat: 'worker',   title: 'Minimum wage and overtime in BC', content: 'BC minimum wage is $17.40/hr (2024). Overtime kicks in after 8 hours/day or 40 hours/week. After 8 hours: time-and-a-half. After 12 hours: double time. Your employer MUST pay overtime — they cannot make you "agree" to waive it.' },
  { cat: 'worker',   title: 'You cannot be fired for filing a complaint', content: "BC Employment Standards Act protects you from retaliation. If your employer fires, demotes, or punishes you for filing a complaint, reporting unsafe conditions, or exercising your rights, that's illegal retaliation. File a complaint with the Employment Standards Branch." },
  { cat: 'worker',   title: 'Workplace safety is your RIGHT', content: 'Under WorkSafeBC, you have three fundamental rights: 1) Right to KNOW about hazards, 2) Right to PARTICIPATE in health and safety, 3) Right to REFUSE unsafe work without punishment. If conditions are dangerous, you can refuse.' },
  { cat: 'worker',   title: 'Wrongful termination and severance', content: 'If fired without cause, you\'re entitled to notice or pay in lieu: 1 week after 3 months, 2 weeks after 1 year, scaling up. After 5+ years of service, additional common law notice may apply. "Just cause" termination requires serious misconduct — bad performance reviews alone are rarely enough.' },
  { cat: 'police',   title: 'You have the right to remain silent', content: 'In Canada, you do NOT have to answer police questions beyond identifying yourself (in some circumstances). You can say: "I don\'t wish to make a statement." Be polite but firm. Anything you say CAN and WILL be used against you.' },
  { cat: 'police',   title: 'When police CAN and CANNOT search you', content: 'Police generally need a warrant to search you, your home, or your vehicle. Exceptions: search incident to arrest, plain view, consent, and exigent circumstances. You can say: "I do not consent to a search." Even if they search anyway, your non-consent is on record.' },
  { cat: 'police',   title: 'Your rights if arrested or detained', content: 'If arrested: 1) Right to be told why, 2) Right to a lawyer immediately (call Legal Aid: 604-685-3425), 3) Right to remain silent, 4) Right to be brought before a judge within 24 hours. Ask: "Am I being detained or am I free to go?"' },
  { cat: 'police',   title: 'How to file a police complaint in BC', content: 'For municipal police: Office of the Police Complaint Commissioner (OPCC) at opcc.bc.ca. For RCMP: Civilian Review and Complaints Commission (CRCC). You can file online. Keep notes of the incident: date, time, officers involved, badge numbers, witnesses.' },
  { cat: 'benefits', title: 'Income Assistance basics in BC', content: 'If you have no income or very low income, you may qualify for BC Income Assistance. Single person rate is approximately $935/month (shelter + support). Apply through gov.bc.ca/incomeassistance or call 1-866-866-0800. You need: ID, proof of income (or lack thereof), housing costs, and bank statements.' },
  { cat: 'benefits', title: 'PWD provides significantly more support', content: 'Persons with Disabilities (PWD) designation raises your monthly rate significantly above basic IA. You also get: extended medical/dental, annual bus pass, earnings exemptions ($15,000/year), and crisis supplements. See our PWD Guide for the application process.' },
  { cat: 'benefits', title: 'You can earn some money on assistance', content: 'On basic IA: you can earn $500/month before deductions. On PWD: you can earn $15,000/year ($1,250/month) before dollar-for-dollar deductions. Some income types are fully exempt (GST credit, child benefits, etc.).' },
  { cat: 'benefits', title: 'Crisis supplements and emergency help', content: "If you're on IA or PWD and face an emergency (fire, flood, essential appliance breakdown, etc.), you can request a crisis supplement. Also available: moving supplements, security deposit, and health supplements for specific needs. Ask your worker — they don't always volunteer this information." },
  { cat: 'medical',  title: 'You can see your own medical records', content: "Under BC's Freedom of Information and Protection of Privacy Act, you have the right to access your medical records. Hospitals, clinics, and doctors must provide them (may charge a reasonable copying fee). Request in writing." },
  { cat: 'medical',  title: 'You can refuse treatment', content: 'Competent adults have the right to refuse any medical treatment, even life-saving treatment. This includes: medication, surgery, blood transfusions, etc. Your doctor must respect your decision and explain the risks. This is called "informed consent."' },
  { cat: 'medical',  title: 'Fair PharmaCare covers prescription costs', content: 'BC Fair PharmaCare helps cover prescription drug costs based on income. Register through gov.bc.ca/pharmacare. If you\'re on IA or PWD, you likely have full coverage. If not, your deductible is based on net income.' },
  { cat: 'medical',  title: 'Patient care quality complaints', content: "If you've had a bad experience with healthcare: 1) Start with the facility's patient care quality office, 2) Health authority patient relations, 3) BC Patient Safety & Quality Council, 4) College of the relevant profession (doctors, nurses, etc.) for professional conduct issues." },
];

export default function RightsDatabase() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (idx) => setOpenItems(prev => ({ ...prev, [idx]: !prev[idx] }));

  const filtered = RIGHTS_DATA.filter(item => {
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory;
    const matchesSearch = !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-[#08080f] min-h-screen text-white">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-6 h-6 text-[#4a90d9]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>Know Your Rights BC</h1>
      </div>
      <p className="text-sm text-[#666] mb-6">Plain language guide to your rights in British Columbia.</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] w-5 h-5" />
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search rights..." 
          className="w-full h-12 rounded-xl bg-[#0a0a1a] border border-[#1a1a2e] text-white pl-10 placeholder:text-[#444] focus:outline-none focus:border-[#4a90d9]" 
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory('all')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeCategory === 'all' ? 'bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30' : 'text-[#666] hover:text-[#ccc] border border-[#1a1a2e]'}`}>All</button>
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button key={key} onClick={() => setActiveCategory(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeCategory === key ? 'border' : 'text-[#666] hover:text-[#ccc] border border-[#1a1a2e]'}`}
            style={activeCategory === key ? { backgroundColor: `${cat.color}20`, borderColor: `${cat.color}40`, color: cat.color } : {}}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 pb-12">
        {filtered.length === 0 && <p className="text-[#666] text-center py-8">No results found. Try different search terms.</p>}
        {filtered.map((item) => {
          const cat = CATEGORIES[item.cat];
          const globalIdx = RIGHTS_DATA.indexOf(item);
          return (
            <div key={globalIdx} className="bg-[#0a0a1a] border border-[#1a1a2e] rounded-xl overflow-hidden card-glow">
              <button onClick={() => toggleItem(globalIdx)} className="w-full flex items-start gap-3 p-4 text-left">
                <span className="text-lg">{cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <span className="text-[10px] uppercase tracking-wider mt-1 inline-block" style={{ color: cat.color }}>{cat.label}</span>
                </div>
                {openItems[globalIdx] ? <ChevronUp className="w-4 h-4 text-[#666] flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-[#666] flex-shrink-0 mt-1" />}
              </button>
              {openItems[globalIdx] && (
                <div className="px-4 pb-4 pl-11 border-t border-[#1a1a2e]">
                  <p className="text-sm text-[#999] mt-3 leading-relaxed whitespace-pre-line">{item.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// AUTO-GENERATED FROM SHEET "services"
export type Service = {
  key: string;
  title: string;
  slug: string;
  cardDescription: string;
  description: string;
  imageId: string;
  iconName: string;
  schemaType: string;
  schemaOfferUrl: string;
};

export const services: Service[] = [
  {
  key: "noise-survey",
  title: "Noise Survey",
  slug: "noise-survey",
  cardDescription: "Low cost, accurate noise surveys, workplace noise and noise monitoring for all scenarios.",
  description: `We provide low-cost, comprehensive noise survey and noise modelling services across the UK. Whether you need an environmental noise survey for a feasibility study or planning application, a workplace noise assessment, or ongoing monitoring for an operational site, our experienced acoustic consultants deliver fast, accurate results you can rely on.
All surveys are carried out by friendly, qualified engineers using precision instrumentation in accordance with current British Standards and best practice guidance, including BS7445, BS8233, BS4142 and Noise at Work Regulations where applicable.
Using modern, efficient survey and analysis processes, we deliver results that are both technically robust and easy to understand. Our streamlined approach ensures accuracy, quick turnaround times and exceptional value. From early design advice to compliance reporting, we help clients make informed, confident decisions at every project stage.
`,
  imageId: "service-noise-survey",
  iconName: "AudioLines",
  schemaType: "Service",
  schemaOfferUrl: "/services/noise-survey"
},
  {
  key: "noise-impact-assessment",
  title: "Noise Impact Assessment",
  slug: "noise-impact-assessment",
  cardDescription: "Comprehensive noise assessments for all design and planning needs.",
  description: `Whether you need a noise impact assessment to support your planning application, to inform the design of your scheme, or to demonstrate compliance with specific performance requirements, we can help. Our consultants have years of experience delivering noise impact assessments for a wide range of projects across the built environment and would love to see how we can help you.

Each assessment is prepared in accordance with relevant standards and guidance, including BS8233, BS4142, BS5228, ProPG, and local planning policy, ensuring clarity, accuracy and compliance. We assess the potential impact of noise from transport, industrial and mechanical sources on proposed developments, and provide practical, design-led mitigation advice on layout, façade performance and specification.

By maintaining close communication with planning officers, design teams and environmental health professionals, we help streamline the approval process and minimise risk. Our clear, evidence-based reporting ensures robust, policy-compliant outcomes at every stage of design and planning.`,
  imageId: "service-noise-impact-assessment",
  iconName: "ChartColumn",
  schemaType: "Service",
  schemaOfferUrl: "/services/noise-impact-assessment"
},
  {
  key: "acoustic-planning-support",
  title: "Acoustic Planning Support",
  slug: "acoustic-planning-support",
  cardDescription: "Expert acoustic support to help navigate the planning process.",
  description: `We provide expert acoustic planning support across the UK, helping developers, architects, planning consultants and private clients navigate the complex acoustic requirements of the planning system. Our input covers site suitability, layout optimisation, noise mitigation and compliance with national and regional planning policies.

Combining extensive technical expertise with strategic planning insight, each assessment delivers robust analysis, compliant reporting and, where required, practical mitigation solutions that support successful planning outcomes.

From feasibility through to full planning submission, we prepare clear, robust technical documentation that stands up to scrutiny and liaise with design teams, planning consultants and local authorities to facilitate smooth approvals.`,
  imageId: "service-acoustic-planning-support",
  iconName: "SquareCheckBig",
  schemaType: "Service",
  schemaOfferUrl: "/services/acoustic-planning-support"
},
  {
  key: "building-acoustics",
  title: "Building Acoustics",
  slug: "building-acoustics",
  cardDescription: "Building acoustic design for all sectors of the built environment.",
  description: `Our Building Acoustics services support architects, designers and developers in creating buildings that meet regulatory standards, safeguard health and wellbeing, and deliver environments where people can truly thrive.

We design and review façade performance and building services noise to achieve appropriate indoor ambient noise levels. We assess layouts, materials and junction details to control airborne, impact and flanking sound transmission, and carefully design room acoustics to meet end-user expectations for comfort and usability — ensuring spaces sound as good as they look.

Each project is approached with technical rigour, following relevant standards and guidance such as Approved Document E, BREEAM, BS8233, BB93 and HTM 08-01 to ensure robust, compliant and verifiable design outcomes.

From small residential conversions to large mixed-use developments, schools to healthcare facilities, and offices to community and leisure spaces, we provide clear, practical acoustic design advice from concept to completion — helping reduce overdesign, manage risk and achieve sustainable performance.`,
  imageId: "service-architectural-acoustics",
  iconName: "Building2",
  schemaType: "ProfessionalService",
  schemaOfferUrl: "/services/building-acoustics"
},
  {
  key: "acoustic-consultant",
  title: "Acoustic Consultancy",
  slug: "acoustic-consultancy",
  cardDescription: "Independent, practical, and reliable acoustic consultancy from concept to completion.",
  description: `Veas Acoustics offers independent, practical and reliable acoustic consultancy services across the full project lifecycle, from early feasibility through detailed design to construction and commissioning.

With 20 years of experience, we deliver tailored acoustic solutions that meet performance, regulatory and sustainability goals. Our expertise spans environmental, building services and architectural acoustics, providing technical clarity and responsive advice.

Whether advising on noise strategy, acoustic design or on-site support and testing, our focus is on delivering value through excellence, collaboration and efficiency, ensuring every project benefits from acoustic excellence at every stage.`,
  imageId: "service-acoustic-consultant",
  iconName: "Handshake",
  schemaType: "ProfessionalService",
  schemaOfferUrl: "/services/acoustic-consultancy"
}
];

export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);
export const getServiceByKey = (key: string) => services.find(s => s.key === key);

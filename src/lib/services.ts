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
  key: "home",
  title: "Home Page",
  slug: "home",
  cardDescription: "Veas Acoustics Home Page",
  description: ``,
  imageId: "",
  iconName: "",
  schemaType: "Organization",
  schemaOfferUrl: ""
},
  {
  key: "noise-survey",
  title: "Noise Surveys",
  slug: "noise-survey",
  cardDescription: "Low cost, accurate noise surveys, workplace noise and noise monitoring for all scenarios.",
  description: `Whether you need a survey for a workplace noise assessment, ongoing noise monitoring for an operational or construction site, or an environmental noise survey to support the acoustic design, a feasibility study or a planning application, our service is delivered with a focus on accuracy, clarity and competitive pricing.

Surveys are carried out using precision instrumentation and follow current British Standards and recognised best-practice guidance, including BS7445, BS8233, BS4142 and the Control of Noise at Work Regulations where required.

Modern, efficient acoustic survey and analysis methods help keep everything clear and straightforward, with results that are technically robust, easy to understand and ready to use. A streamlined approach supports quick turnaround times, strong technical confidence and excellent value. From early design advice to full compliance reporting, our clients receive clear, reliable information they can act on with confidence.`,
  imageId: "service-noise-survey",
  iconName: "AudioLines",
  schemaType: "Service",
  schemaOfferUrl: "/services/noise-survey"
},
  {
  key: "noise-impact-assessment",
  title: "Noise Impact Assessments",
  slug: "noise-impact-assessment",
  cardDescription: "Comprehensive noise assessments for all design and planning needs.",
  description: `Whether you need a noise impact assessment to support your planning application, to inform the design of your scheme or to demonstrate compliance with specific performance requirements, we can help. With years of experience delivering noise impact assessments for a wide spectrum of projects across the built environment and would love to see how we can help you.

We understand that all projects are different with their own unique challenges. Our services are therefore tailored to suit each and every project ensuring the process, information, level of detail and the design solutions meet the project's specific needs. 

Our modern processes are highly efficient making use of the latest technologies to effectively support the design process, by identifying and mitigating risk early, ensuring accurate and robust assessments whilst adopting the appropriate level of tolerance for yours and your projects needs.

Our reports are comprehensive but concise, detailed but easy to understand, helping you, the key stakeholders and decision makers make the right decisions for your project at the right time. 
`,
  imageId: "service-noise-impact-assessment",
  iconName: "ChartColumn",
  schemaType: "Service",
  schemaOfferUrl: "/services/noise-impact-assessment"
},
  {
  key: "acoustic-planning-support",
  title: "Acoustic Planning Support",
  slug: "acoustic-planning-support",
  cardDescription: "Expert acoustic planning support to help navigate the planning process.",
  description: `We provide expert acoustic planning support services across the UK, helping architects, developers, planning consultants and also private clients navigate the acoustic complexities within the planning process. 

With experience combining extensive technical expertise with strategic planning insight, we deliver robust assessments, compliant reports, and practical mitigation solutions that secure planning approval.

Our input covers compliance with local and national planning policy, site suitability, layout optimisation, noise assessments and mitigation, local authority liaison and also compliance and validation at the end of the project.

Throughout the planning process, we work closely with our clients, the design team and local authority, providing clear, robust technical guidance and design information, as well as documentation that stands up to scrutiny, to support a smooth process to secure planning approval.`,
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
  description: `Building Acoustics Design is our main area of expertise. We provide building acoustic design services to architects, designers and developers to create buildings that meet regulatory standards, safeguard health and wellbeing and deliver environments where people can truly thrive.

We design and review acoustic façade performance and building services noise to achieve appropriate indoor ambient noise levels. We assess layouts, materials, construction types and junction details to control airborne, impact and flanking sound transmission and we carefully design room acoustics to meet end-user expectations for comfort, usability and speech intelligibility, ensuring spaces sound as good as they look.

Each project is approached with technical rigour, following relevant standards, current guidance and best practices to ensure robust, compliant and verifiable design outcomes.

Supporting projects across all sectors of the built environment, our experience ranges from small residential conversions to large mixed-use developments, encompassing schools, healthcare facilities, offices, community facilities and sports and leisure spaces

Our approach is to provide clear, practical acoustic design advice from concept to completion, helping reduce overdesign, manage risk through strategies considerate of sustainability. Excellent communication is one of our core values and we work closely with project teams to ensure the acoustic design solutions complement the architectural design philosophy, while remaining practical and buildable.
`,
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
},
  {
  key: "acoustic-testing",
  title: "Acoustic Testing",
  slug: "acoustic-testing",
  cardDescription: "Acoustic investigative and compliance testing",
  description: `We provide acoustic testing for site investigations for refurb projects for example for conversions of commercial premises into residential units as well as acoustic compliance testing at the end of the project.  `,
  imageId: "service-acoustic-testing",
  iconName: "",
  schemaType: "Service",
  schemaOfferUrl: "/services/acoustic-testing"
}
];


export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);
export const getServiceByKey = (key: string) => services.find(s => s.key === key);

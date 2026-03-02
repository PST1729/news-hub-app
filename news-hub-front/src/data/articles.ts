export interface Article {
  id: string;
  title: string;
  summary: string;
  fullSummary: string;
  author: string;
  publisher: string;
  publisherLogo: string;
  thumbnail: string;
  date: string;
  category: string;
  externalUrl: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "OpenAI Unveils GPT-5 with Groundbreaking Reasoning Capabilities",
    summary: "The latest model demonstrates near-human performance on complex scientific and mathematical benchmarks.",
    fullSummary: "OpenAI has officially launched GPT-5, its most advanced large language model to date, showcasing remarkable improvements in logical reasoning, mathematical problem-solving, and scientific analysis. The model reportedly achieves scores within the top percentile on graduate-level examinations across multiple disciplines, marking a significant leap from its predecessor.\n\nIndustry experts are calling this release a pivotal moment for artificial intelligence, noting that GPT-5's ability to maintain coherent reasoning across extended multi-step problems sets a new standard for the field. OpenAI CEO Sam Altman emphasized the company's commitment to safety, revealing that GPT-5 underwent the most rigorous evaluation process in the company's history before its public release.",
    author: "Sarah Chen",
    publisher: "TechCrunch",
    publisherLogo: "https://img.icons8.com/color/48/t.png",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    date: "2026-02-23",
    category: "AI/ML",
    externalUrl: "https://techcrunch.com"
  },
  {
    id: "2",
    title: "Apple's Mixed Reality Headset Sales Surpass 10 Million Units",
    summary: "Vision Pro adoption accelerates as enterprise and consumer use cases expand rapidly.",
    fullSummary: "Apple's Vision Pro mixed reality headset has officially crossed the 10 million units sold milestone, a figure that industry analysts initially projected would take considerably longer to reach. The acceleration in sales has been attributed to a wave of enterprise partnerships and a growing library of immersive consumer applications.\n\nThe company announced new partnerships with major healthcare systems and architectural firms that are integrating Vision Pro into their daily workflows. Apple's SVP of Hardware Engineering noted that the spatial computing platform is evolving faster than any previous Apple product category, with developer interest surging as the ecosystem matures.",
    author: "Marcus Webb",
    publisher: "The Verge",
    publisherLogo: "https://img.icons8.com/color/48/v.png",
    thumbnail: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&h=400&fit=crop",
    date: "2026-02-22",
    category: "Hardware",
    externalUrl: "https://theverge.com"
  },
  {
    id: "3",
    title: "Quantum Computing Achieves New Error Correction Milestone",
    summary: "Google's quantum team demonstrates fault-tolerant operations at unprecedented scale.",
    fullSummary: "Google's Quantum AI division has announced a breakthrough in quantum error correction, successfully demonstrating fault-tolerant quantum operations across a 1,000-qubit processor. This achievement addresses one of the most persistent challenges in quantum computing: maintaining the stability of quantum states long enough to perform meaningful calculations.\n\nThe implications of this breakthrough extend far beyond the laboratory. Researchers believe this milestone brings practical quantum computing applications—such as drug discovery simulations and complex financial modeling—significantly closer to reality. Several pharmaceutical companies have already expressed interest in early access programs to explore the technology's potential.",
    author: "Dr. Lisa Park",
    publisher: "Wired",
    publisherLogo: "https://img.icons8.com/color/48/w.png",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    date: "2026-02-21",
    category: "Science",
    externalUrl: "https://wired.com"
  },
  {
    id: "4",
    title: "Tesla's Robotaxi Service Launches in 5 Major US Cities",
    summary: "Fully autonomous ride-hailing now available in San Francisco, Austin, Miami, Phoenix, and Las Vegas.",
    fullSummary: "Tesla has officially launched its long-anticipated Robotaxi service across five major US metropolitan areas, marking the company's most ambitious step into autonomous transportation. The service utilizes Tesla's latest fleet of purpose-built autonomous vehicles, featuring no steering wheel or pedals, and operates 24/7 in designated zones within each city.\n\nEarly rider feedback has been overwhelmingly positive, with users praising the smooth ride quality and competitive pricing. However, regulatory scrutiny remains intense, with the National Highway Traffic Safety Administration maintaining active oversight of the program. Tesla CEO Elon Musk projected that the service would expand to 20 additional cities by year's end.",
    author: "James Rodriguez",
    publisher: "Bloomberg",
    publisherLogo: "https://img.icons8.com/color/48/b.png",
    thumbnail: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop",
    date: "2026-02-20",
    category: "Automotive",
    externalUrl: "https://bloomberg.com"
  },
  {
    id: "5",
    title: "EU Passes Landmark AI Regulation Framework",
    summary: "The comprehensive legislation sets global precedent for governing artificial intelligence systems.",
    fullSummary: "The European Union has formally adopted its AI Act implementation guidelines, creating the world's most comprehensive regulatory framework for artificial intelligence. The legislation categorizes AI systems by risk level, imposing strict requirements on high-risk applications in healthcare, law enforcement, and critical infrastructure while maintaining lighter oversight for lower-risk consumer applications.\n\nTech companies have expressed mixed reactions to the new rules. While some praise the clarity and predictability the framework provides, others warn that overly stringent compliance requirements could stifle innovation and push AI development to less regulated regions. The regulation is expected to influence similar legislative efforts in the United States, Canada, and several Asian nations.",
    author: "Elena Müller",
    publisher: "Reuters",
    publisherLogo: "https://img.icons8.com/color/48/r.png",
    thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    date: "2026-02-19",
    category: "Policy",
    externalUrl: "https://reuters.com"
  },
  {
    id: "6",
    title: "SpaceX Starship Completes First Commercial Satellite Deployment",
    summary: "The fully reusable rocket system delivers 40 satellites to orbit in a single mission.",
    fullSummary: "SpaceX has achieved another historic milestone as its Starship launch system successfully completed its first commercial satellite deployment mission, placing 40 communications satellites into low Earth orbit in a single launch. The mission demonstrated Starship's unparalleled payload capacity and further validated the fully reusable rocket architecture.\n\nThe successful deployment marks the beginning of a new era in commercial space operations, with SpaceX already booking missions for dozens of additional customers. Industry analysts estimate that Starship's dramatically lower cost per kilogram to orbit could reduce satellite deployment expenses by up to 90% compared to traditional launch vehicles, potentially democratizing access to space for smaller companies and nations.",
    author: "David Kim",
    publisher: "Ars Technica",
    publisherLogo: "https://img.icons8.com/color/48/a.png",
    thumbnail: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&h=400&fit=crop",
    date: "2026-02-18",
    category: "Space",
    externalUrl: "https://arstechnica.com"
  },
  {
    id: "7",
    title: "Microsoft Integrates AI Copilot Across All Office Products",
    summary: "Every Microsoft 365 application now features deeply embedded AI assistance at no extra cost.",
    fullSummary: "Microsoft has announced that its AI Copilot feature is now fully integrated across the entire Microsoft 365 suite at no additional cost to subscribers, a move that analysts say could fundamentally reshape workplace productivity. The enhanced Copilot can now draft complex documents, analyze spreadsheets, create presentations, and manage email workflows with unprecedented sophistication.\n\nThe decision to include Copilot at no extra charge represents a strategic shift for Microsoft, which previously offered the feature as a premium add-on. CEO Satya Nadella described the move as part of Microsoft's vision to make AI an integral part of every knowledge worker's daily toolkit, predicting that within two years, working without AI assistance will feel as outdated as working without the internet.",
    author: "Rachel Adams",
    publisher: "The Information",
    publisherLogo: "https://img.icons8.com/color/48/i.png",
    thumbnail: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=600&h=400&fit=crop",
    date: "2026-02-17",
    category: "Enterprise",
    externalUrl: "https://theinformation.com"
  },
  {
    id: "8",
    title: "NVIDIA Announces Next-Gen GPU Architecture with 2x Performance",
    summary: "The Blackwell Ultra chips promise to double AI training throughput while cutting energy use.",
    fullSummary: "NVIDIA has unveiled its next-generation Blackwell Ultra GPU architecture, promising to double AI training and inference performance while simultaneously reducing energy consumption by 40%. The announcement sent NVIDIA's stock to new all-time highs and reinforced the company's dominant position in the AI hardware market.\n\nThe new chips are designed specifically to handle the rapidly growing computational demands of frontier AI models, which are doubling in size approximately every six months. NVIDIA CEO Jensen Huang emphasized that the Blackwell Ultra architecture represents a fundamental rethinking of GPU design, incorporating novel memory architectures and interconnect technologies that address the most critical bottlenecks in large-scale AI training.",
    author: "Tom Nguyen",
    publisher: "AnandTech",
    publisherLogo: "https://img.icons8.com/color/48/n.png",
    thumbnail: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop",
    date: "2026-02-16",
    category: "Hardware",
    externalUrl: "https://anandtech.com"
  },
  {
    id: "9",
    title: "Stripe Launches Embedded Banking Services for Platforms",
    summary: "Developers can now offer full banking features including accounts and cards through Stripe's API.",
    fullSummary: "Stripe has expanded beyond payments processing with the launch of Stripe Embedded Banking, a comprehensive suite of banking services that allows platforms and marketplaces to offer their users full-featured bank accounts, debit cards, and lending products. The service is built on Stripe's existing infrastructure and requires minimal integration effort for developers already using the platform.\n\nThe move positions Stripe as a direct competitor to traditional banking-as-a-service providers and represents a significant expansion of the fintech giant's addressable market. Early adopters include several major gig economy platforms and e-commerce marketplaces that see embedded banking as a way to increase user engagement and create new revenue streams.",
    author: "Priya Sharma",
    publisher: "TechCrunch",
    publisherLogo: "https://img.icons8.com/color/48/t.png",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    date: "2026-02-15",
    category: "Fintech",
    externalUrl: "https://techcrunch.com"
  },
  {
    id: "10",
    title: "GitHub Reports 100 Million Developers Now Use Copilot",
    summary: "AI-assisted coding has become the default workflow for the majority of professional developers.",
    fullSummary: "GitHub has announced that its Copilot AI coding assistant has reached 100 million active users, a milestone that underscores the rapid adoption of AI-assisted programming across the software development industry. The platform reports that Copilot now generates an average of 46% of all code written on GitHub, up from 30% just one year ago.\n\nThe data reveals interesting patterns in how developers interact with AI assistance. Senior developers tend to use Copilot primarily for boilerplate code and documentation, while junior developers leverage it more extensively for learning and problem-solving. GitHub's VP of Product emphasized that Copilot is not replacing developers but fundamentally changing how they work, allowing them to focus more on architecture and design decisions.",
    author: "Alex Turner",
    publisher: "GitHub Blog",
    publisherLogo: "https://img.icons8.com/color/48/g.png",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    date: "2026-02-14",
    category: "Developer",
    externalUrl: "https://github.blog"
  },
];

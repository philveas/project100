// src/components/sections/Location.tsx
// You would need to add location data fields (like address, mapUrl, etc.) to your Firestore sections.

import { MapPin } from "lucide-react";
import { type TextSectionProps } from "@/types/sections"; // Reusing the TextSectionProps interface

export function LocationSection({ section }: TextSectionProps) {
    // Assuming the section has fields like 'locationAddress' and 'locationMapEmbedUrl'
    // FIX APPLIED: Guarantee String type for the address before rendering
const address = String(section?.["locationAddress"] ?? "123 Business Rd, City, Postcode");
    
    // FIX APPLIED: Guarantee String type for the iframe src attribute
    const mapEmbedUrl = String(section?.["locationMapEmbedUrl"] ?? "");
    
    const heading = String(section?.["locationHeading"] ?? "Our Service Area");

    return (
        <section className="py-16 md:py-24 bg-grey-foreground">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-headline font-semibold text-primary text-center mb-12">
                    {heading}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Map Embed */}
                    {/* The mapEmbedUrl check here guarantees it's not an empty string ("") */}
                    {mapEmbedUrl && (
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                            <iframe
                                src={mapEmbedUrl} // Now guaranteed safe string
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Service Location"
                            ></iframe>
                        </div>
                    )}
                    {/* Contact Details */}
                    <div className="flex flex-col justify-center bg-card p-8 rounded-lg shadow-xl">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Find Us</h3>
                        <div className="flex items-start space-x-3 text-lg text-grey-medium">
                            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                            <p className="font-light whitespace-pre-line">{address}</p>
                        </div>
                        {/* Add more location/contact info here (phone, email, hours) */}
                    </div>
                </div>
            </div>
        </section>
    );
}
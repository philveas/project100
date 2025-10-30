'use client';

import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { Service } from '@/lib/services';
import { ServiceIcons } from '@/lib/service-icons';
import { getPlaceholder } from '@/lib/placeholders';

type Props = { service: Service };

export default function ServiceCard({ service }: Props) {
  // FIX: Assert that service.key is a valid key of the ServiceIcons object.
  const Icon = ServiceIcons[service.key as keyof typeof ServiceIcons] ?? (() => null);
  const ph = getPlaceholder(service.imageId);

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-44 w-full">
        {ph ? (
          <Image
            src={ph.imageUrl}
            alt={ph.description ?? service.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="h-full w-full bg-grey" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {ph?.imageHint && (
          <div className="absolute top-3 right-3 rounded-xl bg-white/90 backdrop-blur px-2 py-1 text-xs">
            {ph.imageHint}
          </div>
        )}
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-xl border p-2">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="text-lg font-semibold">{service.title}</h3>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-grey-foreground">
          {service.cardDescription ?? service.description ?? ''}
        </p>
      </CardContent>
    </Card>
  );
}

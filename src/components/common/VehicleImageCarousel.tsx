import { NeuImage } from "@/components/common/NeuImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import type { ImageLink } from "@/lib/types";
import { ImageIcon } from "lucide-react";

interface VehicleImageCarouselProps {
  images: ImageLink[];
}

export const VehicleImageCarousel = ({ images }: VehicleImageCarouselProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-muted/30 rounded-md flex items-center justify-center">
        <ImageIcon className="h-10 w-10 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">No images available</span>
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={1 + (index + 1)}>
            <div className="p-1">
              <div className="flex flex-col gap-2 items-center">
                <NeuImage image={image.url} alt={image.alt} />
                <p className="text-sm font-medium text-center">{image.alt}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-between mt-4">
        <CarouselPrevious className="static translate-y-0 h-10 w-10 border rounded-md" />
        <CarouselNext className="static translate-y-0 h-10 w-10 border rounded-md" />
      </div>
    </Carousel>
  );
};

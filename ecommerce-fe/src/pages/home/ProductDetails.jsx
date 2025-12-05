import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatter } from "@/utils";

export default function ProductDetail({ product }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className="flex justify-center bg-[#f6f6f6] mt-[70px]">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[768px]"
        />
      </div>
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-2xl font-light">{product.title}</h1>
          <p className="text-xl font-medium">
            {formatter.format(product.price)}
          </p>

          <div>
            <label className="block text-sm mb-1">Size</label>
            <div className="border-t border-gray-300 py-4 text-sm text-gray-700">
              {product.sizes?.join(", ")}
            </div>
          </div>

          <div>
            <h3 className="uppercase font-semibold text-sm mb-1">
              Product Description
            </h3>
            <p className="text-xs text-gray-600 mb-1">{product.style}</p>
            <p className="text-sm leading-relaxed">{product.description}</p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-b divide-y"
          >
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>{product.details}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="commitment">
              <AccordionTrigger>Our Commitment</AccordionTrigger>
              <AccordionContent>{product.commitment}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <p className="text-sm">
            Select the size of the item to see the expected delivery date.
          </p>
          <Button className="w-full bg-black text-white text-sm py-6 uppercase tracking-wide">
            Select Size
          </Button>

          <div className="space-y-4 text-sm">
            <div>
              <strong>📞 Contact Us</strong>
              <p>Our Client Advisors are available to help you.</p>
            </div>

            <div>
              <strong>📍 Check Availability in Store</strong>
            </div>

            <div>
              <strong>➕ Gucci Services</strong>
              <p>
                Complimentary Shipping, Complimentary Exchanges & Returns,
                Secure Payments and Signature Packaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

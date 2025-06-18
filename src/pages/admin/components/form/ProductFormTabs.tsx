
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductFormValues } from './productFormSchema';
import { JsonEditor } from './JsonEditor';

type ProductFormTabsProps = {
  control: Control<ProductFormValues>;
};

export const ProductFormTabs = ({ control }: ProductFormTabsProps) => {
  return (
    <Tabs defaultValue="features" className="pt-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="features" className="mt-4">
        <FormField control={control} name="features" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="array"
                label="Product Features"
                placeholder='["Feature 1", "Feature 2", "Feature 3"]'
              />
            </FormControl>
            <FormDescription>Add key features and benefits of this product.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="gallery" className="mt-4">
        <FormField control={control} name="gallery" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="gallery_images"
                label="Gallery Images"
                placeholder='[{"url": "https://example.com/image1.jpg", "alt": "Product image 1"}]'
              />
            </FormControl>
            <FormDescription>Add URLs of product images for the gallery.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>

      <TabsContent value="videos" className="mt-4">
        <FormField control={control} name="videos" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="videos"
                label="Product Videos"
                placeholder='[{"url": "https://youtube.com/watch?v=...", "alt": "Product demo", "type": "youtube"}]'
              />
            </FormControl>
            <FormDescription>Add product videos from YouTube, Vimeo, or upload direct video files.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="specifications" className="mt-4">
        <FormField control={control} name="specifications" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="specifications"
                label="Technical Specifications"
                placeholder='{"Dimensions": "10 x 5 x 3 inches", "Weight": "2.5 kg", "Material": "Stainless Steel"}'
              />
            </FormControl>
            <FormDescription>Add technical specifications using the form above, or switch to JSON mode for advanced editing.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="documents" className="mt-4">
        <FormField control={control} name="documents" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="documents"
                label="Product Documents"
                placeholder='[{"name": "Product Datasheet", "type": "datasheet", "url": "https://example.com/datasheet.pdf"}]'
              />
            </FormControl>
            <FormDescription>Add product documentation, datasheets, and manuals.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
    </Tabs>
  );
};


import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductFormValues } from './productFormSchema';

type ProductFormTabsProps = {
  control: Control<ProductFormValues>;
};

export const ProductFormTabs = ({ control }: ProductFormTabsProps) => {
  return (
    <Tabs defaultValue="features" className="pt-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="features" className="mt-2">
        <FormField control={control} name="features" render={({ field }) => (
            <FormItem>
                <FormLabel>Features (JSON Array)</FormLabel>
                <FormControl><Textarea {...field} value={field.value ?? ''} rows={5} placeholder='[ "Feature 1", "Feature 2" ]' /></FormControl>
                <FormDescription>A JSON array of strings.</FormDescription>
                <FormMessage />
            </FormItem>
        )} />
      </TabsContent>
      <TabsContent value="gallery" className="mt-2">
         <FormField control={control} name="gallery" render={({ field }) => (
            <FormItem>
                <FormLabel>Gallery (JSON Array)</FormLabel>
                <FormControl><Textarea {...field} value={field.value ?? ''} rows={5} placeholder='[ "url1.jpg", "url2.jpg" ]' /></FormControl>
                <FormDescription>A JSON array of image URLs.</FormDescription>
                <FormMessage />
            </FormItem>
        )} />
      </TabsContent>
      <TabsContent value="specifications" className="mt-2">
        <FormField control={control} name="specifications" render={({ field }) => (
            <FormItem>
                <FormLabel>Specifications (JSON Object)</FormLabel>
                <FormControl><Textarea {...field} value={field.value ?? ''} rows={5} placeholder='{ "Key 1": "Value 1", "Key 2": "Value 2" }' /></FormControl>
                <FormDescription>A JSON object of key-value pairs.</FormDescription>
                <FormMessage />
            </FormItem>
        )} />
      </TabsContent>
      <TabsContent value="documents" className="mt-2">
        <FormField control={control} name="documents" render={({ field }) => (
            <FormItem>
                <FormLabel>Documents (JSON Array)</FormLabel>
                <FormControl><Textarea {...field} value={field.value ?? ''} rows={8} placeholder={'[\n  {\n    "name": "Datasheet",\n    "type": "datasheet",\n    "url": "https://example.com/doc.pdf"\n  }\n]'} /></FormControl>
                <FormDescription>A JSON array of document objects.</FormDescription>
                <FormMessage />
            </FormItem>
        )} />
      </TabsContent>
    </Tabs>
  )
}


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
import { JsonEditor } from './JsonEditor';

interface ProjectFormTabsProps {
  control: Control<any>;
}

export const ProjectFormTabs = ({ control }: ProjectFormTabsProps) => {
  return (
    <Tabs defaultValue="gallery" className="pt-4">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="specifications">Specs</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="challenges">Challenges</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
      </TabsList>
      
      <TabsContent value="gallery" className="mt-4">
        <FormField control={control} name="gallery_images" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="gallery_images"
                label="Project Gallery"
                placeholder='[{"url": "https://example.com/image1.jpg", "alt": "Project overview"}]'
              />
            </FormControl>
            <FormDescription>Add project images with descriptions.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="specifications" className="mt-4">
        <FormField control={control} name="specifications" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Specifications</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value ?? ''} 
                rows={6} 
                placeholder='{"Area": "5000 sq ft", "Duration": "6 months", "Budget": "$500,000"}' 
                className="font-mono text-sm"
              />
            </FormControl>
            <FormDescription>Technical specifications and project details in JSON format.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="timeline" className="mt-4">
        <FormField control={control} name="timeline" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Timeline</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value ?? ''} 
                rows={6} 
                placeholder='[{"phase": "Planning", "duration": "2 weeks", "status": "completed"}]' 
                className="font-mono text-sm"
              />
            </FormControl>
            <FormDescription>Project phases and timeline in JSON format.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="team" className="mt-4">
        <FormField control={control} name="team_members" render={({ field }) => (
          <FormItem>
            <FormLabel>Team Members</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value ?? ''} 
                rows={6} 
                placeholder='[{"name": "John Doe", "role": "Project Manager", "image": "url"}]' 
                className="font-mono text-sm"
              />
            </FormControl>
            <FormDescription>Project team members in JSON format.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="challenges" className="mt-4">
        <FormField control={control} name="challenges" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Challenges</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value ?? ''} 
                rows={6} 
                placeholder='[{"challenge": "Weather conditions", "solution": "Adjusted timeline"}]' 
                className="font-mono text-sm"
              />
            </FormControl>
            <FormDescription>Challenges faced and solutions in JSON format.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="results" className="mt-4">
        <FormField control={control} name="results" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Results</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                value={field.value ?? ''} 
                rows={6} 
                placeholder='[{"metric": "Efficiency Increase", "value": "25%", "description": "Improved fuel dispensing speed"}]' 
                className="font-mono text-sm"
              />
            </FormControl>
            <FormDescription>Project outcomes and achievements in JSON format.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
    </Tabs>
  );
};

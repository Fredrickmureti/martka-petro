
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
import { JsonEditor } from './JsonEditor';

interface ProjectFormTabsProps {
  control: Control<any>;
}

export const ProjectFormTabs = ({ control }: ProjectFormTabsProps) => {
  return (
    <Tabs defaultValue="gallery" className="pt-4">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="specifications">Specs</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
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

      <TabsContent value="videos" className="mt-4">
        <FormField control={control} name="project_videos" render={({ field }) => (
          <FormItem>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="videos"
                label="Project Videos"
                placeholder='[{"url": "https://youtube.com/watch?v=...", "alt": "Project walkthrough", "type": "youtube"}]'
              />
            </FormControl>
            <FormDescription>Add project videos from YouTube, Vimeo, or upload direct video files to project-videos storage bucket.</FormDescription>
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
                label="Project Specifications"
                placeholder='{"Area": "5000 sq ft", "Duration": "6 months", "Budget": "$500,000"}'
              />
            </FormControl>
            <FormDescription>Technical specifications and project details.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="timeline" className="mt-4">
        <FormField control={control} name="timeline" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Timeline</FormLabel>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="array"
                label="Timeline Events"
                placeholder='[{"phase": "Planning", "duration": "2 weeks", "status": "completed"}]'
              />
            </FormControl>
            <FormDescription>Project phases and timeline.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="team" className="mt-4">
        <FormField control={control} name="team_members" render={({ field }) => (
          <FormItem>
            <FormLabel>Team Members</FormLabel>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="array"
                label="Team Members"
                placeholder='[{"name": "John Doe", "role": "Project Manager", "image": "url"}]'
              />
            </FormControl>
            <FormDescription>Project team members.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
      
      <TabsContent value="results" className="mt-4">
        <FormField control={control} name="results" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Results</FormLabel>
            <FormControl>
              <JsonEditor
                value={field.value || ''}
                onChange={field.onChange}
                type="array"
                label="Project Results"
                placeholder='[{"metric": "Efficiency Increase", "value": "25%", "description": "Improved fuel dispensing speed"}]'
              />
            </FormControl>
            <FormDescription>Project outcomes and achievements.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </TabsContent>
    </Tabs>
  );
};


import { Control, useFieldArray } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

interface ProjectFormArrayFieldsProps {
  control: Control<any>;
}

export const ProjectFormArrayFields = ({ control }: ProjectFormArrayFieldsProps) => {
  const { fields: tags, append: appendTag, remove: removeTag } = useFieldArray({ control, name: 'tags' });
  const { fields: galleryImages, append: appendGalleryImage, remove: removeGalleryImage } = useFieldArray({ control, name: 'gallery_images' });
  const { fields: specifications, append: appendSpecification, remove: removeSpecification } = useFieldArray({ control, name: 'specifications' });
  const { fields: timeline, append: appendTimeline, remove: removeTimeline } = useFieldArray({ control, name: 'timeline' });

  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-4">Tags</h3>
        {tags.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <FormField name={`tags.${index}.value`} control={control} render={({ field }) => (
              <Input {...field} placeholder="Tag" />
            )} />
            <Button type="button" variant="destructive" size="icon" onClick={() => removeTag(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => appendTag({ value: '' })}>
          Add Tag
        </Button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Gallery Images</h3>
        {galleryImages.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center">
            <FormField name={`gallery_images.${index}.url`} control={control} render={({ field }) => 
              <Input {...field} placeholder="Image URL"/>
            } />
            <FormField name={`gallery_images.${index}.alt`} control={control} render={({ field }) => 
              <Input {...field} placeholder="Alt text"/>
            } />
            <Button type="button" variant="destructive" size="icon" onClick={() => removeGalleryImage(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => appendGalleryImage({ url: '', alt: '' })}>
          Add Gallery Image
        </Button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Specifications</h3>
        {specifications.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center">
            <FormField name={`specifications.${index}.name`} control={control} render={({ field }) => 
              <Input {...field} placeholder="Name" />
            } />
            <FormField name={`specifications.${index}.value`} control={control} render={({ field }) => 
              <Input {...field} placeholder="Value" />
            } />
            <Button type="button" variant="destructive" size="icon" onClick={() => removeSpecification(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => appendSpecification({ name: '', value: '' })}>
          Add Specification
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Timeline</h3>
        {timeline.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md mb-2 space-y-2">
            <div className="flex justify-end">
              <Button type="button" variant="destructive" size="icon" onClick={() => removeTimeline(index)}>
                <Trash2 className="h-4 w-4"/>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name={`timeline.${index}.date`} control={control} render={({ field }) => 
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 2023-01-15" />
                  </FormControl>
                </FormItem>
              }/>
              <FormField name={`timeline.${index}.status`} control={control} render={({ field }) => 
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              }/>
            </div>
            <FormField name={`timeline.${index}.description`} control={control} render={({ field }) => 
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            }/>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => appendTimeline({ date: '', description: '', status: 'planned' })}>
          Add Timeline Event
        </Button>
      </div>
    </>
  );
};

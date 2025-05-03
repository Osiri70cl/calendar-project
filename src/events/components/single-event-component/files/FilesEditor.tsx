import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Download, File, Plus, X } from "lucide-react";

type Props = {
  files: any[];
  onAddFile: () => void;
  onRemoveFile: (name: string) => void;
};

const FilesEditor = ({ files, onAddFile, onRemoveFile }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Downloadable Files</FormLabel>
        <Button type="button" variant="outline" size="sm" onClick={onAddFile}>
          <Plus className="h-4 w-4 mr-1" /> Add File
        </Button>
      </div>

      <div className="space-y-2">
        {files.length === 0 && (
          <p className="text-sm text-muted-foreground">No files uploaded</p>
        )}

        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div className="flex items-center">
              <File className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive"
                onClick={() => onRemoveFile(file.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesEditor;

import { Button } from "@/components/ui/button";
import { Download, File } from "lucide-react";

type Props = {
  files: any[];
};

const FilesList = ({ files }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Downloadable Files</h3>
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;

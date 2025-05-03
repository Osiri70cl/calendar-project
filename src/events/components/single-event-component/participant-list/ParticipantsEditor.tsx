import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, Users, X } from "lucide-react";
import { useState } from "react";

type Props = {
  participants: any[];
  onAdd: (email: string) => void;
  onRemove: (email: string) => void;
};

const ParticipantsEditor = ({ participants, onAdd, onRemove }: Props) => {
  const [newEmail, setNewEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddParticipant = () => {
    if (newEmail && validateEmail(newEmail)) {
      onAdd(newEmail);
      setNewEmail("");
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4">
      <FormLabel>Participants</FormLabel>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Add participant email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              if (e.target.value === "" || validateEmail(e.target.value)) {
                setIsEmailValid(true);
              }
            }}
            className={cn("pl-8", !isEmailValid ? "border-red-500" : "")}
          />
        </div>
        <Button type="button" size="sm" onClick={handleAddParticipant}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {!isEmailValid && (
        <p className="text-red-500 text-xs mt-1">
          Please enter a valid email address
        </p>
      )}

      {/* Participant List */}
      <div className="flex flex-wrap gap-2 mt-2">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1"
          >
            <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 mr-2">
              {getInitials(participant.email)}
            </div>
            <span className="text-sm">{participant.email}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 ml-1"
              onClick={() => onRemove(participant.email)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsEditor;

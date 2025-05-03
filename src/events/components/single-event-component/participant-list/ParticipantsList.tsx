type Props = {
  participants: any[];
};

const ParticipantsList = ({ participants }: Props) => {
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Participants</h3>
      <div className="flex flex-wrap gap-2">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1"
          >
            <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6 mr-2">
              {getInitials(participant.email)}
            </div>
            <span className="text-sm">{participant.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;

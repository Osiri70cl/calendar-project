interface EmailTemplateProps {
  fullName: string;
  email: string;
  projectDescription: string;
  budget: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  fullName,
  email,
  projectDescription,
  budget,
}) => (
  <div>
    <h1>Nouvelle soumission de formulaire de contact</h1>
    <p>Nom et prénom: {fullName}</p>
    <p>Email: {email}</p>
    <p>Description du projet: {projectDescription}</p>
    <p>Budget: {budget}</p>
  </div>
);

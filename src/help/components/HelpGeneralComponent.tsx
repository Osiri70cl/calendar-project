"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useState } from "react";

interface TipProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Tip = ({ icon, title, description }: TipProps) => (
  <div className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg shadow-sm">
    <div className="p-3 mb-4 bg-primary/10 text-primary rounded-full">
      {icon}
    </div>
    <h3 className="font-medium mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Comment puis-je modifier mon profil ?",
    answer:
      "Pour modifier votre profil, cliquez sur votre avatar dans le coin supérieur gauche, puis sélectionnez 'Mon profil'. Vous pourrez alors modifier vos informations personnelles, changer votre photo de profil et mettre à jour vos coordonnées.",
  },
  {
    question: "Comment gérer mes notifications ?",
    answer:
      "Vous pouvez gérer vos préférences de notification en accédant à la page 'Notifications' depuis le menu principal. Ici, vous pourrez activer ou désactiver différents types de notifications (email, push), et personnaliser les alertes pour les événements, réunions et messages.",
  },
  {
    question: "Comment créer un nouvel événement ?",
    answer:
      "Pour créer un nouvel événement, accédez à la section 'Calendrier' via le menu latéral, puis cliquez sur le bouton '+ Nouvel événement'. Remplissez les détails requis comme le titre, la date, l'heure et éventuellement les participants, puis cliquez sur 'Enregistrer'.",
  },
  {
    question: "Que faire si j'ai oublié mon mot de passe ?",
    answer:
      "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' sur l'écran de connexion. Entrez l'adresse e-mail associée à votre compte, et vous recevrez un lien pour réinitialiser votre mot de passe. Suivez les instructions dans l'e-mail pour créer un nouveau mot de passe.",
  },
  {
    question: "Comment planifier une réunion avec d'autres utilisateurs ?",
    answer:
      "Pour planifier une réunion, allez dans la section 'Rendez-vous' et cliquez sur 'Nouveau rendez-vous'. Sélectionnez la date et l'heure souhaitées, ajoutez les participants en saisissant leur nom ou adresse e-mail, puis remplissez les détails de la réunion avant de confirmer.",
  },
  {
    question: "Comment exporter mon calendrier ?",
    answer:
      "Pour exporter votre calendrier, accédez à la page 'Calendrier', puis cliquez sur l'icône de paramètres ou d'options (généralement représentée par trois points). Sélectionnez 'Exporter' dans le menu déroulant, choisissez la période et le format souhaités, puis cliquez sur 'Télécharger'.",
  },
];

export function HelpGeneralComponent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [activeTab, setActiveTab] = useState("faq");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Contact form submitted:", contactForm);
    // Reset form or show success message
    alert(
      "Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais."
    );
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className={cn("flex flex-col w-full h-full", className)} {...props}>
      <div className="h-full flex flex-col border-border rounded-lg bg-background shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-border">
          <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <HelpCircle className="text-primary" />
            Centre d'aide
          </h1>
          <p className="text-sm text-muted-foreground">
            Trouvez des réponses à vos questions et obtenez de l'aide sur notre
            plateforme
          </p>
        </div>
        <div className="p-4 sm:p-6 flex-1 overflow-auto">
          <section className="mb-8">
            <h2 className="text-lg font-medium mb-4">
              Conseils pour commencer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Tip
                icon={<HelpCircle size={24} />}
                title="Explorez le menu"
                description="Utilisez le menu latéral pour naviguer facilement entre les différentes fonctionnalités de l'application."
              />
              <Tip
                icon={<AlertCircle size={24} />}
                title="Activez les notifications"
                description="Pour ne rien manquer, configurez vos préférences de notifications dans la section dédiée."
              />
              <Tip
                icon={<MessageSquare size={24} />}
                title="Contactez-nous"
                description="Si vous ne trouvez pas réponse à vos questions, n'hésitez pas à nous contacter directement."
              />
            </div>
          </section>

          <Separator className="my-8" />

          <Tabs
            defaultValue="faq"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid grid-cols-2 w-full sm:w-auto">
              <TabsTrigger value="faq" className="cursor-pointer px-6">
                FAQ
              </TabsTrigger>
              <TabsTrigger value="contact" className="cursor-pointer px-6">
                Nous contacter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Questions fréquemment posées</CardTitle>
                  <CardDescription>
                    Trouvez des réponses aux questions les plus courantes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Contactez notre équipe support</CardTitle>
                  <CardDescription>
                    Nous sommes là pour vous aider. Envoyez-nous votre question
                    et nous vous répondrons dans les plus brefs délais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <form
                        onSubmit={handleContactSubmit}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              Nom
                            </label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Votre nom"
                              value={contactForm.name}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <label
                              htmlFor="email"
                              className="text-sm font-medium"
                            >
                              Email
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="votre.email@exemple.com"
                              value={contactForm.email}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="subject"
                            className="text-sm font-medium"
                          >
                            Sujet
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Sujet de votre message"
                            value={contactForm.subject}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium"
                          >
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Détaillez votre question ou problème..."
                            rows={6}
                            value={contactForm.message}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto">
                          Envoyer le message
                        </Button>
                      </form>
                    </div>
                    <div className="bg-muted p-6 rounded-lg flex flex-col gap-6">
                      <h3 className="font-medium">
                        Autres moyens de nous contacter
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Mail size={20} className="text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">
                              support@exemple.com
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone size={20} className="text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Téléphone</p>
                            <p className="text-sm text-muted-foreground">
                              +33 1 23 45 67 89
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Lun-Ven, 9h-18h
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

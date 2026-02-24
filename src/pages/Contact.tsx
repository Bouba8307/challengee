import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Info } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Contact form data:', data);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-bretagne-blue text-white py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Une question ?</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Nous sommes là pour vous accompagner dans votre projet professionnel. N'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
              <h2 className="text-2xl font-display font-bold text-bretagne-blue mb-8">Nos coordonnées</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-bretagne-blue mb-1">Email</h4>
                    <p className="text-slate-600">contact@cest-ok-bretagne.fr</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-bretagne-blue mb-1">Téléphone</h4>
                    <p className="text-slate-600">02 99 12 34 56</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-accent/20 p-4 rounded-2xl text-bretagne-blue">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-bretagne-blue mb-1">Adresse</h4>
                    <p className="text-slate-600">283 Avenue du Général Patton<br />35700 Rennes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bretagne-blue p-10 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-display font-bold mb-4 relative z-10">Besoin d'aide pour votre formation ?</h3>
              <p className="text-slate-300 text-sm mb-6 relative z-10">
                Nos conseillers en orientation sont disponibles pour vous guider vers le bon diplôme.
              </p>
              <button className="bg-white text-bretagne-blue px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all relative z-10">
                Prendre rendez-vous
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 h-full">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-8">
                    <MessageSquare className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-bretagne-blue mb-4">Message envoyé !</h2>
                  <p className="text-slate-600 max-w-md mx-auto mb-10">
                    Merci pour votre message. Un membre de notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-display font-bold text-bretagne-blue mb-4">Envoyez-nous un message</h2>
                  <p className="text-slate-500 mb-12">Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.</p>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Nom complet</label>
                        <input
                          {...register('name', { required: true })}
                          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                          placeholder="Marie Martin"
                        />
                        {errors.name && <span className="text-primary text-xs font-bold">Ce champ est requis</span>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Sujet</label>
                        <select
                          {...register('subject', { required: true })}
                          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary appearance-none transition-all"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="formation">Information formation</option>
                          <option value="emploi">Offres d'emploi</option>
                          <option value="campagne">La campagne C'est OK</option>
                          <option value="autre">Autre demande</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Email</label>
                      <input
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                        placeholder="marie.martin@exemple.fr"
                      />
                      {errors.email && <span className="text-primary text-xs font-bold">Email invalide</span>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Message</label>
                      <textarea
                        {...register('message', { required: true })}
                        rows={6}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all resize-none"
                        placeholder="Comment pouvons-nous vous aider ?"
                      />
                      {errors.message && <span className="text-primary text-xs font-bold">Ce champ est requis</span>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                      Envoyer le message
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-bretagne-blue rounded-full text-sm font-bold mb-6">
            <Info className="w-4 h-4" />
            Besoin d'une réponse rapide ?
          </div>
          <h2 className="text-3xl font-display font-bold text-bretagne-blue mb-12">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              { q: "Quels sont les diplômes requis pour travailler en crèche ?", a: "Le CAP AEPE est le premier niveau, mais vous pouvez aussi être auxiliaire de puériculture ou éducateur de jeunes enfants." },
              { q: "Puis-je faire une reconversion professionnelle ?", a: "Absolument ! De nombreux dispositifs de financement existent en Bretagne pour accompagner votre changement de carrière." },
              { q: "Quels sont les avantages à travailler en Bretagne ?", a: "Un cadre de vie exceptionnel, un secteur qui recrute massivement et des structures innovantes à taille humaine." },
              { q: "Comment obtenir l'agrément d'assistant maternel ?", a: "L'agrément est délivré par le Conseil Départemental après une évaluation de vos capacités et de votre logement." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-bretagne-blue mb-3">{faq.q}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

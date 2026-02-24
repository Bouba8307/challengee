import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Upload, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    setIsSubmitted(true);
    // In a real app, we would send this to a server
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-display font-bold text-bretagne-blue mb-4">C'est OK !</h2>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Votre candidature a bien été transmise. Nos équipes l'étudieront avec la plus grande attention. À bientôt !
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux offres
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-primary p-10 text-white">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Postuler maintenant</h1>
            <p className="text-white/80">
              {jobId === 'general' 
                ? 'Déposez votre candidature spontanée pour rejoindre nos équipes en Bretagne.'
                : 'Vous postulez pour une offre spécifique. Remplissez le formulaire ci-dessous.'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Prénom</label>
                <input
                  {...register('firstName', { required: true })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Jean"
                />
                {errors.firstName && <span className="text-primary text-xs font-bold">Ce champ est requis</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Nom</label>
                <input
                  {...register('lastName', { required: true })}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Dupont"
                />
                {errors.lastName && <span className="text-primary text-xs font-bold">Ce champ est requis</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Email</label>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="jean.dupont@exemple.fr"
              />
              {errors.email && <span className="text-primary text-xs font-bold">Email invalide</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Téléphone</label>
              <input
                {...register('phone', { required: true })}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="06 12 34 56 78"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Message de motivation</label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all resize-none"
                placeholder="Dites-nous pourquoi vous souhaitez rejoindre le secteur de la petite enfance..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Curriculum Vitae (CV)</label>
                <div className="relative group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register('cv', { required: true })}
                  />
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-4 group-hover:text-primary" />
                    <p className="text-sm text-slate-500 font-medium">Cliquez ou glissez votre CV ici</p>
                    <p className="text-xs text-slate-400 mt-2">PDF, DOCX (Max 5Mo)</p>
                  </div>
                </div>
                {errors.cv && <span className="text-primary text-xs font-bold">Veuillez joindre votre CV</span>}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-bretagne-blue uppercase tracking-wider">Lettre de motivation (Optionnel)</label>
                <div className="relative group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register('coverLetter')}
                  />
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center group-hover:border-secondary group-hover:bg-secondary/5 transition-all">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-4 group-hover:text-secondary" />
                    <p className="text-sm text-slate-500 font-medium">Ajouter une lettre de motivation</p>
                    <p className="text-xs text-slate-400 mt-2">PDF, DOCX (Max 5Mo)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                Envoyer ma candidature
                <Send className="w-5 h-5" />
              </button>
              <p className="text-center text-xs text-slate-400 mt-6">
                En envoyant ce formulaire, vous acceptez que vos données soient traitées dans le cadre de votre candidature.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

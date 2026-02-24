import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Profession, TrainingPath } from "../types";

const posters = [
  {
    id: 1,
    title: "C'est OK de choisir un métier qui compte",
    subtitle: "Rejoignez les professionnels de la petite enfance en Bretagne.",
    image: "https://picsum.photos/seed/poster1/1920/1080",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "C'est OK de retomber en enfance chaque matin",
    subtitle: "Un métier créatif et plein de vie vous attend.",
    image: "https://picsum.photos/seed/poster2/1920/1080",
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "C'est OK d'être utile dès 8h du matin",
    subtitle: "Participez à l'éveil des futurs citoyens bretons.",
    image: "https://picsum.photos/seed/poster3/1920/1080",
    color: "bg-bretagne-blue",
  },
];

const professions: Profession[] = [
  {
    id: "1",
    title: "Éducateur de Jeunes Enfants",
    description:
      "Accompagnez l'éveil et le développement des tout-petits à travers le jeu et l'éducation.",
    images: [
      "https://picsum.photos/seed/edu1/600/400",
      "https://picsum.photos/seed/edu2/600/400",
      "https://picsum.photos/seed/edu3/600/400",
    ],
    color: "bg-primary",
  },
  {
    id: "2",
    title: "Auxiliaire de Puériculture",
    description:
      "Assurez les soins d'hygiène, de confort et participez à l'éveil des enfants.",
    images: [
      "https://picsum.photos/seed/aux1/600/400",
      "https://picsum.photos/seed/aux2/600/400",
      "https://picsum.photos/seed/aux3/600/400",
    ],
    color: "bg-secondary",
  },
  {
    id: "3",
    title: "Assistant Maternel",
    description:
      "Accueillez des enfants à votre domicile et offrez-leur un cadre sécurisant et stimulant.",
    images: [
      "https://picsum.photos/seed/mat1/600/400",
      "https://picsum.photos/seed/mat2/600/400",
      "https://picsum.photos/seed/mat3/600/400",
    ],
    color: "bg-accent",
  },
  {
    id: "4",
    title: "Animateur Petite Enfance",
    description:
      "Proposez des activités ludiques et créatives pour favoriser l'épanouissement des enfants.",
    images: [
      "https://picsum.photos/seed/anim1/600/400",
      "https://picsum.photos/seed/anim2/600/400",
      "https://picsum.photos/seed/anim3/600/400",
    ],
    color: "bg-bretagne-blue",
  },
];

interface ProfessionCardProps {
  prof: Profession;
  index: number;
  key?: string | number;
}

function ProfessionCard({ prof, index }: ProfessionCardProps) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setCurrentImg((prev) => (prev + 1) % prof.images.length);
      },
      4000 + index * 500,
    ); // Staggered auto-play
    return () => clearInterval(timer);
  }, [prof.images.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-slate-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="h-48 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={prof.images[currentImg]}
            alt={prof.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Manual Controls for Card */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentImg(
                (prev) => (prev - 1 + prof.images.length) % prof.images.length,
              );
            }}
            className="p-1 bg-white/80 rounded-full text-bretagne-blue hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentImg((prev) => (prev + 1) % prof.images.length);
            }}
            className="p-1 bg-white/80 rounded-full text-bretagne-blue hover:bg-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {prof.images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${currentImg === i ? "bg-white w-3" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-bretagne-blue mb-4 group-hover:text-primary transition-colors">
          {prof.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {prof.description}
        </p>
        <Link
          to="/jobs"
          className="text-primary font-bold text-sm flex items-center gap-2 group/link"
        >
          En savoir plus
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

const trainings: TrainingPath[] = [
  {
    id: "1",
    title: "CAP Accompagnant Éducatif Petite Enfance",
    duration: "1 à 2 ans",
    level: "Niveau 3 (CAP/BEP)",
    description:
      "Le premier niveau de qualification pour travailler en crèche ou à domicile.",
  },
  {
    id: "2",
    title: "Diplôme d'État d'Auxiliaire de Puériculture",
    duration: "1 an",
    level: "Niveau 4 (Bac)",
    description:
      "Formation spécialisée dans les soins et l'accompagnement du jeune enfant.",
  },
  {
    id: "3",
    title: "Diplôme d'État d'Éducateur de Jeunes Enfants",
    duration: "3 ans",
    level: "Niveau 6 (Bac+3)",
    description:
      "Formation supérieure axée sur la pédagogie et la gestion de projet éducatif.",
  },
];

export default function Home() {
  const [currentPoster, setCurrentPoster] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % posters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextPoster = () =>
    setCurrentPoster((prev) => (prev + 1) % posters.length);
  const prevPoster = () =>
    setCurrentPoster((prev) => (prev - 1 + posters.length) % posters.length);

  return (
    <div className="overflow-hidden">
      {/* Poster Carousel Section */}
      <section className="relative h-[70vh] md:h-[85vh] bg-slate-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoster}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-bretagne-blue/80 to-transparent z-10" />
            <img
              src={posters[currentPoster].image}
              alt={posters[currentPoster].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.4 }}
                  className="max-w-2xl"
                >
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-bold mb-6 border border-white/30">
                    Campagne #CestOK
                  </span>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                    {posters[currentPoster].title
                      .split("OK")
                      .map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-primary italic">OK</span>
                          )}
                        </span>
                      ))}
                  </h2>
                  <p className="text-xl text-white/80 mb-10 leading-relaxed">
                    {posters[currentPoster].subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      to="/jobs"
                      className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30"
                    >
                      Découvrir les métiers
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-bretagne-blue transition-all"
                    >
                      Nous contacter
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
          <button
            onClick={prevPoster}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3">
            {posters.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPoster(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPoster === i ? "bg-primary w-8" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPoster}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Professions Section */}
      <section id="metiers" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-bretagne-blue mb-6">
              Des métiers passionnants
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Chaque jour est une nouvelle aventure. Découvrez la diversité des
              parcours dans la petite enfance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professions.map((prof, index) => (
              <ProfessionCard key={prof.id} prof={prof} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-bretagne-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 transform translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Ils témoignent pour vous
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Découvrez les coulisses du métier à travers les yeux de ceux qui
                le vivent au quotidien en Bretagne.
              </p>
              <div className="space-y-6">
                {[
                  "C'est OK de ne pas avoir une journée qui se ressemble",
                  "C'est OK de retomber en enfance chaque matin",
                  "C'est OK de se sentir utile dès 8h du matin",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-primary p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="https://picsum.photos/seed/video/800/450"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-bretagne-blue p-6 rounded-2xl font-bold shadow-xl">
                #CestOK
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="formations" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-bretagne-blue mb-6">
              Comment y arriver ?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Il existe de nombreuses passerelles et formations pour rejoindre
              le secteur, quel que soit votre parcours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainings.map((training, index) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100"
              >
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-8">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-bretagne-blue mb-2">
                  {training.title}
                </h3>
                <div className="flex gap-2 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                    {training.duration}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full text-secondary">
                    {training.level}
                  </span>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {training.description}
                </p>
                <button className="text-bretagne-blue font-bold flex items-center gap-2 hover:text-primary transition-colors">
                  Voir le programme
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: Briefcase, label: "Offres en Bretagne", value: "450+" },
              { icon: Users, label: "Professionnels", value: "12k" },
              { icon: GraduationCap, label: "Écoles partenaires", value: "15" },
              { icon: CheckCircle2, label: "Taux d'insertion", value: "98%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex p-4 bg-slate-50 rounded-2xl mb-4 text-primary">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-display font-bold text-bretagne-blue mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                Prêt à faire la différence ?
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Votre futur métier vous attend. Rejoignez une communauté de
                passionnés et construisez l'avenir de la Bretagne.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/jobs"
                  className="bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl"
                >
                  Voir les offres d'emploi
                </Link>
                <Link
                  to="/apply/general"
                  className="bg-bretagne-blue text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl"
                >
                  Candidature spontanée
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

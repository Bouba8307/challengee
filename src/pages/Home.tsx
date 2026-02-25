import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, MouseEvent } from "react";
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
      5000 + index * 1000,
    ); // Staggered auto-play
    return () => clearInterval(timer);
  }, [prof.images.length, index]);

  const nextImg = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % prof.images.length);
  };

  const prevImg = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentImg(
      (prev) => (prev - 1 + prof.images.length) % prof.images.length,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-100"
    >
      {/* Card Stack Area */}
      <div className="h-72 bg-slate-50 relative flex items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {prof.images.map((img, i) => {
              const isCurrent = i === currentImg;
              const isNext = i === (currentImg + 1) % prof.images.length;
              const isPrev =
                i ===
                (currentImg - 1 + prof.images.length) % prof.images.length;

              if (!isCurrent && !isNext) return null;

              return (
                <motion.div
                  key={img}
                  style={{ zIndex: isCurrent ? 30 : 20 }}
                  initial={
                    isNext
                      ? { x: 40, y: 10, rotate: 6, opacity: 0, scale: 0.9 }
                      : false
                  }
                  animate={{
                    x: isCurrent ? 0 : 15,
                    y: isCurrent ? 0 : 10,
                    rotate: isCurrent ? -2 : 4,
                    scale: isCurrent ? 1 : 0.95,
                    opacity: 1,
                  }}
                  exit={{
                    x: -200,
                    y: -20,
                    rotate: -15,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="absolute w-48 h-60 bg-white rounded-2xl shadow-xl border-[6px] border-white overflow-hidden cursor-pointer"
                  onClick={nextImg}
                >
                  <img
                    src={img}
                    alt={prof.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Poster-like label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-2 px-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-bretagne-blue uppercase tracking-tighter truncate">
                      {prof.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Manual Controls for Card */}
        <div className="absolute inset-x-4 bottom-4 flex justify-between items-center z-40">
          <button
            onClick={prevImg}
            className="p-2 bg-white shadow-lg rounded-full text-bretagne-blue hover:bg-primary hover:text-white transition-all transform hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1.5">
            {prof.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImg(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${currentImg === i ? "bg-primary w-4" : "bg-slate-300"}`}
              />
            ))}
          </div>

          <button
            onClick={nextImg}
            className="p-2 bg-white shadow-lg rounded-full text-bretagne-blue hover:bg-primary hover:text-white transition-all transform hover:scale-110"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${prof.color}`} />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Fiche Métier
          </span>
        </div>
        <h3 className="text-2xl font-display font-bold text-bretagne-blue mb-4 group-hover:text-primary transition-colors">
          {prof.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {prof.description}
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center justify-center w-full bg-slate-50 text-bretagne-blue font-bold py-4 rounded-2xl hover:bg-primary hover:text-white transition-all group/link"
        >
          Découvrir les offres
          <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
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
      <section className="relative h-[85vh] md:h-[95vh] bg-slate-50 overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a535c_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPoster}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
                    Campagne Bretagne 2026
                  </span>
                  <h1 className="text-5xl md:text-7xl font-display font-bold text-bretagne-blue leading-[1.1] mb-8">
                    {posters[currentPoster].title
                      .split("OK")
                      .map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-primary italic underline decoration-accent decoration-8 underline-offset-8">
                              OK
                            </span>
                          )}
                        </span>
                      ))}
                  </h1>
                  <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                    {posters[currentPoster].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/jobs"
                      className="bg-primary text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center gap-2 group"
                    >
                      Découvrir les métiers
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-white text-bretagne-blue border-2 border-bretagne-blue px-10 py-5 rounded-full font-bold text-xl hover:bg-bretagne-blue hover:text-white transition-all"
                    >
                      Nous contacter
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 lg:order-2 flex justify-center relative py-10">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentPoster}
                  initial={{ x: 150, rotate: 15, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, rotate: -3, opacity: 1, scale: 1 }}
                  exit={{ x: -150, rotate: -15, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative z-20 w-full max-w-[380px] aspect-[3/4] bg-white rounded-[3rem] shadow-2xl border-[12px] border-white overflow-hidden"
                >
                  <img
                    src={posters[currentPoster].image}
                    alt={posters[currentPoster].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-10 left-0 right-0 text-center">
                    <div className="inline-block bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                      <span className="text-primary font-display font-bold text-xl italic">
                        #CestOK
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Background card decorations */}
              <motion.div
                animate={{ rotate: [6, 8, 6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[380px] aspect-[3/4] bg-secondary/20 rounded-[3rem] rotate-6 -z-10 border-2 border-secondary/30"
              />
              <motion.div
                animate={{ rotate: [-12, -10, -12] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[380px] aspect-[3/4] bg-accent/20 rounded-[3rem] -rotate-12 -z-20 border-2 border-accent/30"
              />
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
          <button
            onClick={prevPoster}
            className="p-4 rounded-full bg-white shadow-xl text-bretagne-blue hover:bg-primary hover:text-white transition-all transform hover:scale-110 border border-slate-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3">
            {posters.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPoster(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPoster === i ? "bg-primary w-12" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPoster}
            className="p-4 rounded-full bg-white shadow-xl text-bretagne-blue hover:bg-primary hover:text-white transition-all transform hover:scale-110 border border-slate-100"
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

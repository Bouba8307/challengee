import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Briefcase, ChevronRight, Filter } from 'lucide-react';
import { Job } from '../types';

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Éducateur de Jeunes Enfants (H/F)',
    location: 'Rennes (35)',
    type: 'CDI',
    description: 'Au sein d\'une crèche multi-accueil de 40 berceaux, vous concevez et mettez en œuvre le projet pédagogique.',
    requirements: ['Diplôme d\'État d\'EJE', 'Expérience souhaitée', 'Sens du travail en équipe']
  },
  {
    id: '2',
    title: 'Auxiliaire de Puériculture (H/F)',
    location: 'Brest (29)',
    type: 'CDI',
    description: 'Vous assurez l\'accueil des enfants et de leurs parents. Vous veillez au bien-être et à la sécurité des tout-petits.',
    requirements: ['Diplôme d\'État d\'Auxiliaire de Puériculture', 'Dynamisme', 'Patience']
  },
  {
    id: '3',
    title: 'Assistant Maternel (H/F)',
    location: 'Vannes (56)',
    type: 'Indépendant',
    description: 'La ville de Vannes recherche des assistants maternels pour renforcer son offre d\'accueil à domicile.',
    requirements: ['Agrément du Conseil Départemental', 'Logement adapté', 'Passion pour l\'éveil']
  },
  {
    id: '4',
    title: 'Directeur de Crèche (H/F)',
    location: 'Lorient (56)',
    type: 'CDI',
    description: 'Vous assurez la gestion administrative, financière et humaine de la structure tout en garantissant la qualité de l\'accueil.',
    requirements: ['Diplôme d\'EJE ou Puériculteur', '3 ans d\'expérience minimum', 'Capacités managériales']
  },
  {
    id: '5',
    title: 'Animateur Petite Enfance (H/F)',
    location: 'Saint-Malo (35)',
    type: 'CDD - 6 mois',
    description: 'Vous participez à l\'animation des temps périscolaires pour les enfants de 3 à 6 ans.',
    requirements: ['CAP AEPE ou BAFA', 'Créativité', 'Bon contact enfant']
  },
  {
    id: '6',
    title: 'Agent d\'Entretien et de Restauration (H/F)',
    location: 'Quimper (29)',
    type: 'CDI',
    description: 'Vous assurez l\'hygiène des locaux et la préparation des repas pour les enfants en respectant les normes HACCP.',
    requirements: ['Connaissance des normes d\'hygiène', 'Rigueur', 'Polyvalence']
  }
];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-bretagne-blue text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Trouvez votre futur métier</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Découvrez toutes les opportunités d'emploi dans la petite enfance à travers les 4 départements bretons.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Métier, ville, département..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary appearance-none transition-all"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="Tous">Tous les contrats</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Indépendant">Indépendant</option>
              </select>
            </div>
            <button className="bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold text-bretagne-blue">
            {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} disponible{filteredJobs.length > 1 ? 's' : ''}
          </h2>
          <div className="text-sm text-slate-500 font-medium">
            Trier par : <span className="text-bretagne-blue cursor-pointer hover:underline">Plus récent</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-slate-100 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {job.type}
                      </span>
                      <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-bretagne-blue mb-4 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-2 max-w-3xl">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {job.requirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[160px]">
                    <Link
                      to={`/apply/${job.id}`}
                      className="bg-primary text-white text-center py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10"
                    >
                      Postuler
                    </Link>
                    <button className="text-bretagne-blue border border-bretagne-blue py-3 rounded-xl font-bold hover:bg-bretagne-blue hover:text-white transition-all flex items-center justify-center gap-2">
                      Détails
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-bretagne-blue mb-2">Aucune offre trouvée</h3>
              <p className="text-slate-500">Essayez de modifier vos critères de recherche.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedType('Tous');}}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-accent/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-accent/30">
          <div className="flex items-center gap-6">
            <div className="bg-accent p-4 rounded-2xl hidden md:block">
              <Briefcase className="w-8 h-8 text-bretagne-blue" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-bretagne-blue mb-2">Vous ne trouvez pas votre bonheur ?</h3>
              <p className="text-slate-600">Déposez une candidature spontanée et nous reviendrons vers vous.</p>
            </div>
          </div>
          <Link
            to="/apply/general"
            className="bg-bretagne-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-bretagne-blue/90 transition-colors whitespace-nowrap"
          >
            Candidature spontanée
          </Link>
        </div>
      </section>
    </div>
  );
}

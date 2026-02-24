import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bretagne-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white p-2 rounded-xl">
                <Heart className="text-primary w-6 h-6 fill-current" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                C'est <span className="text-primary">OK</span>
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              Une campagne de promotion des métiers de la petite enfance en Bretagne. Ensemble, valorisons ceux qui accompagnent nos enfants.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/#metiers" className="hover:text-primary transition-colors">Les Métiers</Link></li>
              <li><Link to="/jobs" className="hover:text-primary transition-colors">Offres d'emploi</Link></li>
              <li><Link to="/#formations" className="hover:text-primary transition-colors">Formations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Légal</h4>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">Mentions légales</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Cookies</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Région Bretagne - Campagne C'est OK. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs italic">Fait avec</span>
            <Heart className="text-primary w-4 h-4 fill-current" />
            <span className="text-slate-400 text-xs italic">en Bretagne</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

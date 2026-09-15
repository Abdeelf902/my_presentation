import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Container from '../components/shared/Container';

interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface BlogArticleData {
  title: string;
  excerpt: string;
  intro: string;
  sections: ArticleSection[];
  conclusion: string;
  date: string;
  category: string;
  author: string;
}

const articlesData: Record<string, BlogArticleData> = {
  'pourquoi-angular-application-metier': {
    title: 'Pourquoi choisir Angular pour votre application métier ?',
    excerpt: 'Un retour concret sur les cas où Angular reste un très bon choix pour les applications métier durables.',
    intro:
      "Angular n'est pas toujours le framework le plus léger ni le plus rapide à prendre en main. En revanche, pour une application métier qui doit vivre plusieurs années, être reprise par plusieurs développeurs et garder une base de code stable, il a encore de vrais arguments.",
    date: '2026-04-15',
    category: 'Angular',
    author: 'Abderrahmane El Farouah',
    sections: [
      {
        heading: 'Quand Angular devient intéressant',
        paragraphs: [
          "Je le recommande surtout lorsque le projet dépasse le simple site vitrine : formulaires complexes, droits utilisateurs, tableaux de bord, workflows internes, gestion d'états et appels API nombreux.",
          "Dans ce contexte, Angular impose une structure. C'est parfois contraignant au début, mais très confortable quand le projet grandit.",
        ],
      },
      {
        heading: 'Ce que l’on gagne au quotidien',
        bullets: [
          'Une architecture claire pour organiser les composants, services et routes.',
          'TypeScript partout, ce qui limite beaucoup d’erreurs avant la mise en production.',
          'Des outils intégrés pour les formulaires, le routing, les requêtes HTTP et les tests.',
          'Une base cohérente pour les équipes qui doivent maintenir le projet dans la durée.',
        ],
      },
      {
        heading: 'Ce qu’il faut surveiller',
        paragraphs: [
          "Angular peut être excessif pour une petite page marketing ou un prototype très court. Il faut aussi accepter une discipline de code : nommage, modules, séparation des responsabilités et composants bien découpés.",
          "Le bon choix dépend donc moins de la popularité du framework que de la durée de vie prévue de l'application.",
        ],
      },
    ],
    conclusion:
      "Pour une application métier sérieuse, Angular reste un choix solide. Pas parce qu’il est à la mode, mais parce qu’il aide à construire proprement, à maintenir et à faire évoluer sans repartir de zéro.",
  },
  'laravel-vs-nodejs-quel-choisir': {
    title: 'Laravel vs Node.js : quel framework choisir en 2026 ?',
    excerpt: 'Laravel et Node.js peuvent tous les deux faire le travail. Le bon choix dépend surtout du projet, de l’équipe et de la maintenance.',
    intro:
      "La question n'est pas vraiment de savoir lequel est “meilleur”. Laravel et Node.js ont chacun leur terrain naturel. Ce qui compte, c'est de choisir celui qui rend le projet plus simple à livrer, à sécuriser et à maintenir.",
    date: '2026-04-22',
    category: 'Backend',
    author: 'Abderrahmane El Farouah',
    sections: [
      {
        heading: 'Laravel pour aller vite sur du métier',
        paragraphs: [
          "Laravel est très efficace pour les applications de gestion, extranets, back-offices, CRM légers, API classiques et plateformes avec beaucoup de règles métier.",
          "Son écosystème donne vite accès à l’authentification, aux migrations, aux jobs, aux emails, aux validations et à une structure connue par beaucoup de développeurs PHP.",
        ],
      },
      {
        heading: 'Node.js pour les usages temps réel et JavaScript partout',
        paragraphs: [
          "Node.js est très pertinent quand le projet repose sur du temps réel, des WebSockets, des microservices, du streaming ou une équipe déjà très orientée JavaScript/TypeScript.",
          "Il permet aussi de partager plus facilement certaines logiques entre front et back, à condition de garder une architecture propre.",
        ],
      },
      {
        heading: 'Ma règle simple',
        bullets: [
          'Projet métier classique avec beaucoup de CRUD et de règles : Laravel est souvent plus direct.',
          'Application temps réel, flux continus ou équipe full TypeScript : Node.js prend l’avantage.',
          'Projet long terme : le choix doit aussi tenir compte des compétences disponibles pour la maintenance.',
        ],
      },
    ],
    conclusion:
      "Dans beaucoup de projets PME, Laravel reste un excellent choix par sa productivité. Node.js devient très fort quand les contraintes techniques sortent du schéma web classique.",
  },
  'combien-coute-developpeur-freelance': {
    title: 'Combien coûte un développeur freelance à Mantes-la-Jolie ?',
    excerpt: 'Des repères simples pour comprendre les tarifs d’un projet web freelance dans les Yvelines et en Île-de-France.',
    intro:
      "Le prix d’un projet web dépend rarement d’une seule page ou d’un nombre d’heures théorique. Ce qui fait varier le budget, ce sont les fonctionnalités, les intégrations, le niveau de finition attendu et l’accompagnement après livraison.",
    date: '2026-03-28',
    category: 'Tarifs',
    author: 'Abderrahmane El Farouah',
    sections: [
      {
        heading: 'Quelques fourchettes réalistes',
        bullets: [
          'Site vitrine simple : souvent entre 300 € et 900 € selon le contenu, le design et le SEO.',
          'Site professionnel plus complet : plutôt entre 1 000 € et 3 000 €.',
          'Application métier ou outil interne : généralement sur devis, car chaque workflow change le périmètre.',
          'Boutique en ligne : budget variable selon paiement, catalogue, livraison, stock et automatisations.',
        ],
      },
      {
        heading: 'Ce qui fait monter ou baisser le prix',
        paragraphs: [
          "Un formulaire de contact n’a pas le même impact qu’un espace client, une connexion API, un tableau de bord ou un système de paiement. Le design sur mesure, les contenus à produire et les délais courts jouent aussi beaucoup.",
          "Un devis sérieux doit donc expliquer le périmètre, les livrables, les limites et le niveau de support inclus.",
        ],
      },
      {
        heading: 'L’intérêt d’un freelance local',
        paragraphs: [
          "Pour une entreprise à Mantes-la-Jolie ou dans les Yvelines, la proximité facilite les échanges. On peut cadrer le besoin plus vite, comprendre le contexte local et garder une relation simple après la mise en ligne.",
        ],
      },
    ],
    conclusion:
      "Le bon budget est celui qui correspond au résultat attendu. Mieux vaut cadrer petit et utile au départ, puis faire évoluer le site ou l’application avec de vraies priorités.",
  },
  'creer-application-web-sur-mesure': {
    title: 'Créer une application web sur mesure : le guide complet',
    excerpt: 'Les étapes importantes pour transformer un besoin métier en application web utile, maintenable et adoptée.',
    intro:
      "Une application sur mesure n’est pas seulement une addition d’écrans. C’est une façon de simplifier un processus, d’éviter les doubles saisies et de donner aux équipes un outil qui colle à leur vraie manière de travailler.",
    date: '2026-03-10',
    category: 'Guide',
    author: 'Abderrahmane El Farouah',
    sections: [
      {
        heading: 'Commencer par le terrain',
        paragraphs: [
          "Avant de parler technologie, il faut comprendre comment le travail se fait aujourd’hui : fichiers Excel, emails, validations manuelles, outils existants, points de blocage et tâches répétitives.",
          "Cette étape évite de développer une belle interface qui ne résout pas le bon problème.",
        ],
      },
      {
        heading: 'Construire par versions',
        bullets: [
          'Version 1 : le cœur du besoin, utilisable rapidement.',
          'Version 2 : automatisations, tableaux de bord et confort utilisateur.',
          'Version 3 : intégrations externes, statistiques, optimisation et évolutions métier.',
        ],
      },
      {
        heading: 'Prévoir la maintenance dès le départ',
        paragraphs: [
          "Une application utile va évoluer. Il faut donc penser aux rôles utilisateurs, à la sécurité, aux sauvegardes, aux logs, aux tests et à une architecture compréhensible.",
          "Le sur-mesure fonctionne bien quand il reste lisible pour la personne qui devra le maintenir dans six mois.",
        ],
      },
    ],
    conclusion:
      "Un bon projet sur mesure avance par étapes. On livre vite une base solide, on observe l’usage réel, puis on améliore ce qui apporte vraiment du temps gagné ou moins d’erreurs.",
  },
  'seo-technique-optimiser-react': {
    title: 'SEO technique : optimiser la performance de votre site React',
    excerpt: 'Les points techniques qui comptent vraiment pour rendre une application React ou Angular plus lisible par Google.',
    intro:
      "Le SEO technique n’est pas une couche magique ajoutée à la fin. Il commence dans la structure HTML, la performance, les URLs, les métadonnées et la façon dont le contenu est disponible pour les moteurs de recherche.",
    date: '2026-02-20',
    category: 'SEO',
    author: 'Abderrahmane El Farouah',
    sections: [
      {
        heading: 'Rendre le contenu accessible',
        paragraphs: [
          "Sur une application React ou Angular, il faut vérifier que les pages importantes ont des URLs propres, des titres uniques, des descriptions utiles et un contenu visible sans interaction complexe.",
          "Pour les pages très stratégiques, le rendu côté serveur ou la pré-génération peut faire une vraie différence.",
        ],
      },
      {
        heading: 'Soigner les signaux techniques',
        bullets: [
          'Un seul H1 clair par page.',
          'Des balises title et meta description différentes pour chaque route.',
          'Des liens internes en vrais liens HTML quand c’est possible.',
          'Un sitemap à jour avec les pages importantes.',
          'Des images optimisées et correctement décrites.',
        ],
      },
      {
        heading: 'Ne pas oublier la vitesse',
        paragraphs: [
          "Google regarde l’expérience utilisateur. Des bundles trop lourds, des images mal compressées ou une mise en page qui saute au chargement pénalisent la page.",
          "Le bon réflexe consiste à mesurer régulièrement : Lighthouse, Core Web Vitals, taille des assets et comportement sur mobile.",
        ],
      },
    ],
    conclusion:
      "Un bon SEO technique rend le site plus clair pour Google et plus agréable pour les visiteurs. Les deux vont ensemble : structure propre, vitesse correcte et contenu facile à consulter.",
  },
};

const ADSENSE_CLIENT = 'ca-pub-5921232882242644';
const ADSENSE_TOP_SLOT = '8561894521';
const ADSENSE_BOTTOM_SLOT = '8561894521';

function AdSenseBlock({ slot }: { slot: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as typeof window & {
        adsbygoogle?: unknown[];
      };
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    }
  }, []);

  return (
    <motion.aside
      className="my-12 overflow-hidden rounded-2xl border border-[#dfe3e8] bg-[#f7f9fa] p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Publicité Google Ads"
    >
      <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded bg-[#1a73e8] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            Ad
          </span>
          <span>Google Ads</span>
        </div>
        <span>Sponsored</span>
      </div>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '120px' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </motion.aside>
  );
}

function BlogArticle() {
  const { slug } = Route.useParams();
  const article = articlesData[slug];

  if (!article) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-main mb-4">Article non trouvé</h1>
          <p className="text-text-secondary mb-6">Cet article n'existe pas ou a été déplacé.</p>
          <Link to="/blog" className="text-accent hover:underline">
            Retour au blog
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </Helmet>

      <div className="min-h-screen page-shell prose-premium">
        <Container className="py-12 md:py-16 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent hover:underline mb-8 touch-area focus-visible"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au blog</span>
          </Link>

          <motion.header
            className="mb-12 border-b border-black/10 pb-10 dark:border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </motion.header>

          <motion.article
            className="max-w-none text-text-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed">
              {article.intro}
            </p>

            <AdSenseBlock slot={ADSENSE_TOP_SLOT} />

            <div className="space-y-12">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-5 leading-tight">
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-lg text-text-secondary leading-8 mb-5">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-4 text-lg text-text-secondary">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-4 leading-8">
                          <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="article-callout mt-14 p-6">
              <p className="text-lg text-text-main leading-8">
                {article.conclusion}
              </p>
            </div>

            <AdSenseBlock slot={ADSENSE_BOTTOM_SLOT} />
          </motion.article>

          <motion.div
            className="mt-16 p-8 card-bento"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-text-main mb-4">
              Vous avez un projet {article.category.toLowerCase()} ?
            </h3>
            <p className="text-text-secondary mb-6">
              Discutons de votre projet et obtenez un devis personnalisé gratuitement.
            </p>
            <Link
              to="/contact"
              className="btn btn-premium inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              <span>Me contacter</span>
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
}

export const Route = createFileRoute('/blog/$slug')({
  component: BlogArticle,
});

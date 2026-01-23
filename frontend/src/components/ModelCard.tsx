import { FileType } from '../types/model.types';
import type { Model3D } from '../types/model.types';

interface ModelCardProps {
  model: Model3D;
}

export function ModelCard({ model }: ModelCardProps) {
  // Trouver l'image de rendu (preview)
  const renderImage = model.files.find(
    (file) => file.type === FileType.RENDER_IMAGE
  );

  // Calculer la note moyenne
  const averageRating =
    model.reviews.length > 0
      ? model.reviews.reduce((sum, review) => sum + review.rating, 0) /
        model.reviews.length
      : 0;

  // Formater le prix (Decimal vient comme string ou number)
  const formattedPrice =
    typeof model.price === 'number'
      ? model.price.toFixed(2)
      : parseFloat(model.price.toString()).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Image du modèle */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {renderImage ? (
          <img
            src={renderImage.cloudUrl}
            alt={model.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Pas d'aperçu</p>
            </div>
          </div>
        )}

        {/* Badge nombre de vues */}
        {model.viewCount > 0 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {model.viewCount}
          </div>
        )}
      </div>

      {/* Informations du modèle */}
      <div className="p-4">
        {/* Titre */}
        <h3 className="font-bold text-lg mb-2 truncate text-gray-800">
          {model.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
          {model.description || 'Aucune description disponible'}
        </p>

        {/* Artiste */}
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">
            {model.artist.user.username.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm text-gray-500">
            par{' '}
            <span className="font-semibold text-gray-700">
              {model.artist.user.username}
            </span>
          </p>
        </div>

        {/* Notes */}
        {model.reviews.length > 0 ? (
          <div className="flex items-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {averageRating.toFixed(1)} ({model.reviews.length} avis)
            </span>
          </div>
        ) : (
          <div className="h-6 mb-3 flex items-center">
            <span className="text-sm text-gray-400">Aucun avis</span>
          </div>
        )}

        {/* Prix et bouton */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-blue-600">
            {formattedPrice} €
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}
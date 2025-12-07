import InfoSection from "./InfoSection";
import TypeBadge from "./TypeBadge";
import StatBar from "./StatBar";
import AbilityCard from "./AbilityCard";
import Image from "next/image";
const PokemonContent = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
      {/* Image & Basic Info */}
      <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-6">
        <div className="relative w-72 h-72 xl:w-96 xl:h-96 mx-auto xl:mx-0 bg-linear-to-br from-white/50 to-transparent p-6 rounded-3xl shadow-2xl border-4 border-white/50">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="(max-width: 1280px) 100vw, 50vw"
            className="object-contain rounded-2xl drop-shadow-2xl"
            priority
          />
        </div>

        <div className="space-y-3 pt-4">
          <h1
            id="pokemon-name"
            className="text-5xl xl:text-6xl font-black bg-linear-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
          >
            {pokemon.name.toUpperCase()}
          </h1>
          <p className="text-3xl font-mono text-gray-600 tracking-wider bg-white/50 px-6 py-2 rounded-2xl shadow-md">
            #{pokemon.number}
          </p>
        </div>
      </div>

      {/* Details Sections */}
      <div className="space-y-8">
        <InfoSection title="Types" color="from-blue-500 to-indigo-500">
          <div className="flex flex-wrap gap-3">
            {pokemon.types.map((type, index) => (
              <TypeBadge key={index} type={type.type} slot={type.slot} />
            ))}
          </div>
        </InfoSection>

        <InfoSection title="Physical" color="from-emerald-500 to-teal-500">
          <div className="grid grid-cols-2 gap-6 text-center p-6 bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl">
            <div>
              <p className="text-3xl font-bold text-emerald-600">
                {pokemon.height}m
              </p>
              <p className="text-sm text-emerald-700 uppercase tracking-wide">
                Height
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-600">
                {pokemon.weight}kg
              </p>
              <p className="text-sm text-teal-700 uppercase tracking-wide">
                Weight
              </p>
            </div>
          </div>
        </InfoSection>

        <InfoSection title="Base Stats" color="from-purple-500 to-pink-500">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pokemon.stats.map((stat, index) => (
              <StatBar key={index} stat={stat} />
            ))}
          </div>
        </InfoSection>

        <InfoSection title="Abilities" color="from-amber-500 to-orange-500">
          <div className="space-y-3">
            {pokemon.abilities.map((ability, index) => (
              <AbilityCard key={index} ability={ability} />
            ))}
          </div>
        </InfoSection>
      </div>
    </div>
  );
};
export default PokemonContent;

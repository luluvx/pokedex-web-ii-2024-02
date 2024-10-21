module.exports = {
    calcularRangoStats: (pokemon) => {
        const IVMax = 31; // Valor máximo de IV
        const IVMin = 0;  // Valor mínimo de IV
        const EVMax = 252; // Valor máximo de EV
        const EVMin = 0;   // Valor mínimo de EV
        const nivel = 100; // Nivel 100 del Pokémon

        // Fórmula para HP
        const calcularHP = (baseHP) => {
            const minHP = Math.floor((((2 * baseHP + IVMin + Math.floor(EVMin / 4)) * nivel) / 100) + nivel + 10);
            const maxHP = Math.floor((((2 * baseHP + IVMax + Math.floor(EVMax / 4)) * nivel) / 100) + nivel + 10);
            return [minHP, maxHP];
        };
        

        // Fórmula para otros stats
        const calcularStat = (baseStat) => {
            const minStat = Math.floor(((2 * baseStat + IVMin + Math.floor(EVMin / 4)) * nivel) / 100 + 5);
            const maxStat = Math.floor(((2 * baseStat + IVMax + Math.floor(EVMax / 4)) * nivel) / 100 + 5);
            return [minStat, maxStat];
        };

        return {
            hp: calcularHP(pokemon.hp),
            attack: calcularStat(pokemon.attack),
            defense: calcularStat(pokemon.defense),
            spAttack: calcularStat(pokemon.spattack),
            spDefense: calcularStat(pokemon.spdefense),
            speed: calcularStat(pokemon.speed),
        };
    }
};

export class Deck {
    constructor (
        creatures,
        artifacts,
        enchantments,
        planeswalkers,
        instants,
        sorceries,
        lands
    ){
        this.creatures = creatures;
        this.artifacts = artifacts;
        this.enchantments  = enchantments;
        this.planeswalkers = planeswalkers;
        this.instants = instants;
        this.sorceries = sorceries;
        this.lands = lands;
        this.textList = [...creatures, ...artifacts, ...planeswalkers, ...instants, ...sorceries, ...lands].map((card) => card.card_digest.name);
    }

    includesCard(card)  {
        return this.textList.includes(card.card_digest.name);
    }
}

export class EDHDeck extends Deck {
    constructor(
        creatures,
        artifacts,
        enchantments,
        planeswalkers,
        instants,
        sorceries,
        lands,
        commanders
    ){
        super(
            creatures,
            artifacts,
            enchantments,
            planeswalkers,
            instants,
            sorceries,
            lands
        )
        this.commanders = commanders;
        this.textList = [...commanders, ...creatures, ...artifacts, ...planeswalkers, ...instants, ...sorceries, ...lands].map((card) => card.card_digest.name);
    }
}
export const conditions = {
  Blinded: {
    effects: [
      "A blinded creature can't see and automatically fails any ability check that requires sight.",
      "Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
    ],
  },
  Charmed: {
    effects: [
      "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.",
      "The charmer has advantage on any ability check to interact socially with the creature.",
    ],
  },
  Deafened: {
    effects: [
      "A deafened creature can't hear and automatically fails any ability check that requires hearing.",
    ],
  },
  Exhaustion: {
    header:
      "Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An effect can give a creature one or more levels of exhaustion, as specified in the effect's description.",
    footer:
      "If an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect's description.\n\n A creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.\n\n An effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.\n\n Finishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink.",
    table: {
      level: [1, 2, 3, 4, 5, 6],
      effect: [
        "Disadvantage on ability checks",
        "Speed halved",
        "Disadvantage on attack rolls and saving throws",
        "Hit point maximum halved",
        "Speed reduced to zero",
        "Death",
      ],
    },
  },
  Frightened: {
    effects: [
      "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.",
      "The creature can't willingy move closer to the source of its fear.",
    ],
  },
  Grappled: {
    effects: [
      "A grappled creature's speed becomes zero, and it can't benefit from any bonus to its speed.",
      'The condition ends if the grappler is "Incapacitated"',
      'The condition also ends if an effect removed the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the "Thunderwave" spell.',
    ],
  },
  Incapacitated: {
    effects: ["An incapacitated creature can't take actions or reactions."],
  },
  Invisible: {
    effects: [
      "An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obsucred. The creature's location can be detected by any noise it makes or any tracks it leaves.",
      "Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage.",
    ],
  },
  Paralyzed: {
    effects: [
      'A paralyzed creature is "Incapacitated" and can\'t move or speak.',
      "The creature automatically fails Strength and Dexterity saving throws.",
      "Attack rolls against the creature have advantage.",
      "Any attack that hits the creature is a critical hit if the attacker is within five feet of the creature.",
    ],
  },
  Petrified: {
    effects: [
      "A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.",
      'The creature is "Incapacitated", can\'t move or speak, and is unaware of its surroundings.',
      "Attack rolls against the creature have advantage.",
      "The creature automatically fails Strength and Dexterity saving throws.",
      "The creature has resistance to all damage.",
      "The creature is immune to poison and disease, althout a poson or disease already in its system is suspended, not neutralized.",
    ],
  },
  Poisoned: {
    effects: [
      "A poisoned creature has disadvantage on attack rolls and ability checks.",
    ],
  },
  Prone: {
    effects: [
      "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
      "The creature has disadvantage on attack rolls.",
      "An attack roll against the creature has advantage if the attack is within five feet of the creature. Otherwise, the attack roll has disadvantage.",
    ],
  },
  Restrained: {
    effects: [
      "A restrained creature's speed becomes zero, and it can't benefit from any bonus to its speed.",
      "Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
      "The creature has disadvantage on Dexterity saving throws.",
    ],
  },
  Stunned: {
    effects: [
      'A stunned creature is "Incapacitated", can\'t move, and can speak only falteringly.',
      "The creature automatically fails Strength and Dexterity saving throws.",
      "Attack rolls against the creature have advantage.",
    ],
  },
  Unconscious: {
    effects: [
      'An unconscious creature is "Incapacitated", can\'t move or speak, and is unaware of its surroundings.',
      "The creature drops whatever it's holding and falls prone.",
      "The creature automatically fails Strength and Dexterity saving throws.",
      "Attack rolls against the creature have advantage.",
      "Any attack that hits the creature is a critical hit if the attacker is within five feet of the creature.",
    ],
  },
};

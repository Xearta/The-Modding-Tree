/*
 *** LAYER 1 ***
 */
addLayer('p', {
  name: 'prestige', // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: 'P', // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(1),
      best: new Decimal(1),
      total: new Decimal(1),
    };
  },
  color: '#4BDC13',
  requires: new Decimal(5), // Can be a function that takes requirement increases into account
  resource: 'prestige points', // Name of prestige currency
  baseResource: 'points', // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  canBuyMax() {},
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  tabFormat: ['main-display', 'milestones', 'blank', 'blank', 'upgrades'],
  challenges: {
    rows: 2,
    cols: 12,
    11: {
      name: 'Fun',
      completionLimit: 3,
      challengeDescription() {
        return (
          'Makes the game 0% harder<br>' +
          challengeCompletions(this.layer, this.id) +
          '/' +
          this.completionLimit +
          ' completions'
        );
      },
      unlocked() {
        return player[this.layer].best.gt(0);
      },
      goal: new Decimal(20),
      currencyDisplayName: 'lollipops', // Use if using a nonstandard currency
      currencyInternalName: 'points', // Use if using a nonstandard currency
      currencyLayer: this.layer, // Leave empty if not in a layer
      rewardEffect() {
        let ret = player[this.layer].points.add(1).tetrate(0.02);
        return ret;
      },
      rewardDisplay() {
        return format(this.rewardEffect()) + 'x';
      },
      countsAs: [12, 21], // Use this for if a challenge includes the effects of other challenges. Being in this challenge "counts as" being in these.
      rewardDescription: 'Says hi',
      onComplete() {
        console.log('hiii');
      }, // Called when you complete the challenge
    },
  },
  upgrades: {
    rows: 2,
    cols: 3,
    11: {
      title: 'Generator of Genericness',
      description: 'Gain 1 Point every second.',
      cost: new Decimal(1),
      unlocked() {
        return player[this.layer].unlocked;
      }, // The upgrade is only visible when this is true
      effect() {
        let ret = player[this.layer].points.add(1);

        return ret;
      },
    },
    12: {
      description:
        'Candy generation is faster based on your unspent Lollipops.',
      cost: new Decimal(1),
      unlocked() {
        return hasUpgrade(this.layer, 11);
      },
      effect() {
        // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
        let ret = player[this.layer].points
          .add(1)
          .pow(
            player[this.layer].upgrades.includes(24)
              ? 1.1
              : player[this.layer].upgrades.includes(14)
              ? 0.75
              : 0.5
          );
        if (ret.gte('1e20000000')) ret = ret.sqrt().times('1e10000000');
        return ret;
      },
      effectDisplay() {
        return format(this.effect()) + 'x';
      }, // Add formatting to the effect
    },
  },
  hotkeys: [
    {
      key: 'p',
      description: 'P: Reset for prestige points',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
});

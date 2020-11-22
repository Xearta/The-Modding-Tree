/*
 *** ACHIEVEMENTS ***
 */
// A side layer with achievements, with no prestige
addLayer('a', {
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
    };
  },
  color: 'yellow',
  resource: 'achievement power',
  row: 'side',
  layerShown() {
    return true;
  },
  tooltip() {
    // Optional, tooltip displays when the layer is locked
    return 'Achievements';
  },
  achievements: {
    rows: 2,
    cols: 3,
    11: {
      name: 'Get me!',
      done() {
        return true;
      }, // This one is a freebie
      goalTooltip: 'How did this happen?', // Shows when achievement is not completed
      doneTooltip: 'You did it!', // Showed when the achievement is completed
    },
    12: {
      name: 'Impossible!',
      done() {
        return false;
      },
      goalTooltip: 'Mwahahaha!', // Shows when achievement is not completed
      doneTooltip: 'HOW????', // Showed when the achievement is completed
    },
    13: {
      name: 'EIEIO',
      done() {
        return player.p.points.gte(1);
      },
      tooltip:
        'Get a Prestige Point point.\n\nReward: The dinosaur is now your friend (you can max Farm Points).', // Showed when the achievement is completed
      onComplete() {
        console.log('Bork bork bork!');
      },
    },
  },
});

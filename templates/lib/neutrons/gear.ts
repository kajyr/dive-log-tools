import { Dive, Gear } from 'dive-log-importer';

export function getComputer(dive: Partial<Dive>): Gear {
  const computer = dive.gear && dive.gear.find((g) => g.type.toLowerCase() === 'computer');

  return (
    computer || {
      name: '',
      type: 'computer',
    }
  );
}

export function getSuit(dive: Partial<Dive>): Gear {
  const suit =
    dive.gear && dive.gear.find((g) => g.type.toLowerCase() === 'drysuit' || g.type.toLowerCase() === 'wetsuit');
  return suit || { name: '', type: 'wetsuit' };
}

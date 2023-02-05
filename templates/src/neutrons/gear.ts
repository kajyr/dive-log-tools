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

export function gearList(dive: Partial<Dive>): string | null {
  const gear_a = dive.gear?.map((g) => `${g.manufacturer} ${g.name}`).sort();
  return gear_a ? `Attrezzatura: ${gear_a.join(', ')}` : null;
}

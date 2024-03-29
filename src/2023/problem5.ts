import { reportProgress, isDigit } from "../tools";

interface RangeRule {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

export function problem5_part1(input: string): number {
  const lines = input.split('\n');
  const mappings: RangeRule[][] = [];
  let seeds: number[] = [];

  // Load the mappings from the input
  lines.forEach(line => {
    if (line.startsWith('seeds:')) {
      seeds = line.split(' ').map(s => parseInt(s)).filter(n => !isNaN(n));
    } else if (isDigit(line[0])) {
      const numStrs = line.split(' ');
      const rangeRule: RangeRule = {
        destinationRangeStart: parseInt(numStrs[0]),
        sourceRangeStart: parseInt(numStrs[1]),
        rangeLength: parseInt(numStrs[2])
      };
      mappings[mappings.length - 1].push(rangeRule);
    } else if (line.includes(':')) {
      mappings.push([]);
    } else {
      // Empty line, just continue
    }
  });

  // Find the lowest location number of all the seeds
  let lowestLocation = Number.MAX_SAFE_INTEGER;
  seeds.forEach(seed => {
    let currentPosition = seed;

    // Go through all the mappings and convert from seed to soil to fertilizer etc.. to location
    mappings.forEach(map => {
      currentPosition = move(currentPosition, map);
    });

    lowestLocation = Math.min(lowestLocation, currentPosition);
  });

  return lowestLocation;
}

function move(position: number, rangeRules: RangeRule[]): number {
  for (let i = 0; i < rangeRules.length; i++) {
    const rangeRule = rangeRules[i];

    const distIntoRange = position - rangeRule.sourceRangeStart;

    if (distIntoRange < 0) {
      // not in this range, continue
      continue;
    } else if (distIntoRange <= rangeRule.rangeLength) {
      // Map the source position to the destination position plus the distance
      return rangeRule.destinationRangeStart + distIntoRange;
    }
  }
  // If we get here it means we've checked all the range maps and haven't found a re-map, so return the original position
  return position;
}

export function problem5_part2(input: string): number {
  const lines = input.split('\n');
  const mappings: RangeRule[][] = [];
  let seedRanges: number[][] = []; // in pairs, e.g. [[1,2],[3,4]]

  // Load the mappings from the input
  lines.forEach(line => {
    if (line.startsWith('seeds:')) {
      let seedLineNumbers = line.split('seeds: ')[1].split(' ').map(s => parseInt(s));
      seedLineNumbers.forEach((n, i) => {
        if (i % 2 === 0) {
          seedRanges.push([n])
        } else {
          seedRanges[seedRanges.length - 1].push(n)
        }
      });
    } else if (isDigit(line[0])) {
      const numStrs = line.split(' ');
      const rangeRule: RangeRule = {
        destinationRangeStart: parseInt(numStrs[0]),
        sourceRangeStart: parseInt(numStrs[1]),
        rangeLength: parseInt(numStrs[2])
      };
      mappings[mappings.length - 1].push(rangeRule);
    } else if (line.includes(':')) {
      mappings.push([]);
    } else {
      // Empty line, just continue
    }
  });

  // Find the lowest location number of all the seeds
  let lowestLocation = Number.MAX_SAFE_INTEGER;

  // count the total seeds
  let totalSeeds = 0;
  seedRanges.forEach(range => {
    totalSeeds += range[1]; // add the rangeLength
  });

  let i = 0;
  const startTime = process.hrtime();
  for (let iRange = 0; iRange < seedRanges.length; iRange++) {
    const [rangeStart, rangeLength] = seedRanges[iRange];
    const rangeEnd = rangeStart + rangeLength - 1;

    for (let seedStartPosition = rangeStart; seedStartPosition <= rangeEnd; seedStartPosition++) {
      let currentPosition = seedStartPosition;
      if (i++ % 1e7 == 0) {
        reportProgress(startTime, i, totalSeeds);
      }
      // Go through all the mappings and convert from seed to soil to fertilizer etc.. to location
      mappings.forEach(map => {
        currentPosition = move(currentPosition, map);
      });

      lowestLocation = Math.min(lowestLocation, currentPosition);
    }
  }

  console.log(`lowestLocation = ${lowestLocation}`);
  return lowestLocation;
}
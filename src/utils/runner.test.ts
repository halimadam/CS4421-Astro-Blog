import { describe, expect, it } from 'vitest';
import {
	advanceJump,
	advanceObstacles,
	beginJump,
	getNextObstacleGap,
	getRunnerSpeed,
	hasCollision,
	shouldSpawnObstacle,
	spawnObstacle,
} from './runner';

describe('runner utilities', () => {
	it('starts and advances a jump, then lands on the ground', () => {
		const jump = beginJump();
		expect(jump).toEqual({ height: 0, velocity: 620, grounded: false });

		const rising = advanceJump(jump.height, jump.velocity, 0.1);
		expect(rising.height).toBeCloseTo(53);
		expect(rising.grounded).toBe(false);

		expect(advanceJump(rising.height, rising.velocity, 2)).toEqual({
			height: 0,
			velocity: 0,
			grounded: true,
		});
	});

	it('increases speed over time and respects its cap', () => {
		expect(getRunnerSpeed(0)).toBe(260);
		expect(getRunnerSpeed(10)).toBe(350);
		expect(getRunnerSpeed(60)).toBe(520);
		expect(getRunnerSpeed(-1)).toBe(260);
	});

	it('moves obstacles and removes those that have left the play area', () => {
		const obstacles = [
			{ kind: 'chalk' as const, x: 20, y: 0, width: 28, height: 28 },
			{ kind: 'cue' as const, x: 120, y: 0, width: 72, height: 10 },
		];

		expect(advanceObstacles(obstacles, 100, 0.5)).toEqual([
			{ ...obstacles[1], x: 70 },
		]);
	});

	it('spawns predictable pool obstacles and spaces them by sequence', () => {
		expect(spawnObstacle(720, 0)).toMatchObject({ kind: 'chalk', x: 720, width: 28 });
		expect(spawnObstacle(720, 1)).toMatchObject({ kind: 'cue', x: 720, width: 72 });
		expect(spawnObstacle(720, 2)).toMatchObject({ kind: 'balls', x: 720, height: 38 });
		expect(getNextObstacleGap(0)).toBe(300);
		expect(getNextObstacleGap(4)).toBe(300);
		expect(shouldSpawnObstacle(299, 300)).toBe(false);
		expect(shouldSpawnObstacle(300, 300)).toBe(true);
	});

	it('detects overlapping rectangles but not separated ones', () => {
		const obstacle = { kind: 'chalk' as const, x: 50, y: 70, width: 28, height: 28 };
		expect(hasCollision({ x: 60, y: 80, width: 20, height: 20 }, [obstacle])).toBe(true);
		expect(hasCollision({ x: 0, y: 0, width: 20, height: 20 }, [obstacle])).toBe(false);
	});
});

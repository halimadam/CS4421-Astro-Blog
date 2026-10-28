export interface JumpState {
	height: number;
	velocity: number;
	grounded: boolean;
}

export interface RunnerRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export type ObstacleKind = 'chalk' | 'cue' | 'balls';

export interface RunnerObstacle extends RunnerRect {
	kind: ObstacleKind;
}

const GRAVITY = 1_800;
const JUMP_IMPULSE = 620;
const BASE_SPEED = 260;
const SPEED_INCREASE_PER_SECOND = 9;
const MAX_SPEED_INCREASE = 260;
const OBSTACLE_GAPS = [300, 360, 320, 400] as const;
const OBSTACLE_SHAPES: readonly Omit<RunnerObstacle, 'x'>[] = [
	{ kind: 'chalk', width: 28, height: 28, y: 0 },
	{ kind: 'cue', width: 72, height: 10, y: 0 },
	{ kind: 'balls', width: 48, height: 38, y: 0 },
];

export function beginJump(): JumpState {
	return { height: 0, velocity: JUMP_IMPULSE, grounded: false };
}

export function advanceJump(height: number, velocity: number, seconds: number): JumpState {
	const elapsed = Math.max(0, seconds);
	const nextHeight = height + velocity * elapsed - (GRAVITY * elapsed * elapsed) / 2;
	const nextVelocity = velocity - GRAVITY * elapsed;

	if (nextHeight <= 0) {
		return { height: 0, velocity: 0, grounded: true };
	}

	return { height: nextHeight, velocity: nextVelocity, grounded: false };
}

export function getRunnerSpeed(elapsedSeconds: number): number {
	return BASE_SPEED + Math.min(Math.max(0, elapsedSeconds) * SPEED_INCREASE_PER_SECOND, MAX_SPEED_INCREASE);
}

export function advanceObstacles(
	obstacles: readonly RunnerObstacle[],
	speed: number,
	seconds: number,
): RunnerObstacle[] {
	const distance = Math.max(0, speed) * Math.max(0, seconds);
	return obstacles
		.map((obstacle) => ({ ...obstacle, x: obstacle.x - distance }))
		.filter((obstacle) => obstacle.x + obstacle.width > 0);
}

export function shouldSpawnObstacle(distanceTravelled: number, nextSpawnDistance: number): boolean {
	return distanceTravelled >= nextSpawnDistance;
}

export function getNextObstacleGap(sequence: number): number {
	const index = ((Math.floor(sequence) % OBSTACLE_GAPS.length) + OBSTACLE_GAPS.length) % OBSTACLE_GAPS.length;
	return OBSTACLE_GAPS[index];
}

export function spawnObstacle(x: number, sequence: number): RunnerObstacle {
	const index = ((Math.floor(sequence) % OBSTACLE_SHAPES.length) + OBSTACLE_SHAPES.length) % OBSTACLE_SHAPES.length;
	return { ...OBSTACLE_SHAPES[index], x };
}

export function hasCollision(player: RunnerRect, obstacles: readonly RunnerObstacle[]): boolean {
	return obstacles.some(
		(obstacle) =>
			player.x < obstacle.x + obstacle.width &&
			player.x + player.width > obstacle.x &&
			player.y < obstacle.y + obstacle.height &&
			player.y + player.height > obstacle.y,
	);
}

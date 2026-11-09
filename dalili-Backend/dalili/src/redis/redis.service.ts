import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';


@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: 'localhost',
            port: 6379,
        });
    }

    async onModuleDestroy() {
        await this.redis.quit();
    }
    async set(key: string, value: string, ttlSeconds: number): Promise<void> {
        await this.redis.set(key, value, 'EX', ttlSeconds);
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }
}
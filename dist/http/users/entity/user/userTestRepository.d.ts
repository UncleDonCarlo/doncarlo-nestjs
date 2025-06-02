import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
export default class UserTestRepository extends Repository<User> {
    private readonly datasource;
    constructor(datasource: DataSource);
    getWreck(): Promise<{
        messsage: string;
    }>;
}

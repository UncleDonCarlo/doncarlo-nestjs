import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export default class UserTestRepository extends Repository<User> {

    constructor(private readonly datasource: DataSource) {
        super(User, datasource.createEntityManager())
    }

    public async getWreck() {
        return {messsage: "yes"}
    }

}
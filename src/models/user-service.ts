import {User} from "@/models/auth-service";
import {Company, Employee} from "@/models/company-service";

export interface UserInfo {
    userId: string;
    companyId: string | null;
    employeeId: string | null;
    user: User;
    company: Company | null;
    employee: Employee | null;
}
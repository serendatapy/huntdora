
export class Job {
  jobId!: number;
  employerName!: string;
  jobTitle!: string;
  locationName!: string;
  minimumSalary!: number | null;
  maximumSalary!: number | null;
  currency!: string;
  expirationDate!: string;
  date!: string;
  jobDescription!: string;
  applications!: number;
  externalUrl!: string | null;
  jobUrl!: string|null;
  saved:boolean = false;

  static parse(data: {}): Job {
    const job: Job = Object.assign(new Job(), data);
    return job;
  }

  static calculateSalaryFreq(minSalary: number | null, maxSalary: number | null): string {

    if (maxSalary === null) return 'Negotiable'
    else if (maxSalary > 1000) return `${minSalary}-${maxSalary} per annum`
    else if (maxSalary > 100) return `${minSalary}-${maxSalary} per day`
    else return `${minSalary}-${maxSalary} per hour`
  }
}

export interface JobList {
  results: Job[];
}

export class JobDetail {
  jobId!: number;
  jobTitle!: string;
  locationName!: string;
  minimumSalary!: number | undefined;
  maximumSalary!: number | undefined;
  yearlyMinimumSalary!: number | undefined;
  yearlyMaximumSalary!: number | undefined;
  currency!: string;
  salaryType!: string | undefined;
  salary!: string | undefined;
  datePosted!: string;
  expirationDate!: string;
  partTime!: boolean;
  fullTime!: boolean;
  contractType!: string;
  jobDescription!: string;
  applicationCount!: number;
}


export const MockDataDetail = {
  "employerId": 580757,
  "employerName": "Vertech Group (UK) Ltd",
  "jobId": 41315279,
  "jobTitle": "JavaScript Developer",
  "locationName": "Stirling",
  "minimumSalary": 40000.0000,
  "maximumSalary": 50000.0000,
  "yearlyMinimumSalary": 40000.0000,
  "yearlyMaximumSalary": 50000.0000,
  "currency": "GBP",
  "salaryType": "per annum",
  "salary": "£40,000 - £50,000 per annum,negotiable",
  "datePosted": "04/11/2020",
  "expirationDate": "16/12/2020",
  "externalUrl": null,
  "jobUrl": "https://www.reed.co.uk/jobs/javascript-developer/41315279",
  "partTime": false,
  "fullTime": true,
  "contractType": "Permanent",
  "jobDescription":
    " <p><strong>JavaScript Developer</strong></p>< p > Location: < strong > Stirling(remote until post CV19) < /strong>< /p > <p>Salary: <strong>Circa 40K - 50K &#43; Excellent Benefits!</strong></p > <p><strong>JavaScript Developer < /strong> required by fast - growing, global Top Tech Company! < /p>< p > This is a varied, challenging role building back - end,enterprise - level projects < /p > <p><strong>Essential: </strong ></p > <ul><li>JavaScript < /li > <li>Node.js < /li > <li>AWS < /li ><li>MySQL < /li > <li>Keen to learn new technologies < /li > </ul ><p><strong>Nice - to - have(full training provided): </strong></ p > <ul><li>GraphQL < /li></ul > <p>Tremendous opportunity offering plenty of scope for career progression in a friendly, innovative environment where you’ll be able to keep up - to - date with the latest technologies and enjoy a healthy work / life balance! < /p> < p > <strong>Apply now for FULL details! < /strong > </p > ",
  "applicationCount": 4,
};
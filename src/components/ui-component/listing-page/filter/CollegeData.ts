/* eslint-disable @typescript-eslint/no-explicit-any */
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';

import ICheckboxItem, { ICollegeData, IPageData, ICourse, IGeoLocation, ICollege, SelelctedProps } from 'types/college';
import { replaceSpecialChar } from 'utils';

class CollegeInfo {
  private collegeData: ICollege[];
  private pageData: IPageData;
  private courses: ICourse[];

  constructor(data: ICollegeData) {
    this.collegeData = data.collegeData;
    this.pageData = data.pageData;
    this.courses = data.courses;
  }

  private getLocationData(): IGeoLocation[] {
    const locations: IGeoLocation[] = [];

    this.collegeData.forEach((college) => {
      const existingStateIndex = locations.findIndex((location) => location.state === college.state);

      if (existingStateIndex !== -1) {
        if (!locations[existingStateIndex].cities.includes(college.city)) {
          locations[existingStateIndex].cities.push(college.city);
        }
      } else {
        locations.push({
          state: college.state,
          cities: [college.city]
        });
      }
    });

    return locations;
  }

  collegeInfo(): any[] {
    return this.collegeData.map((college) => ({
      name: college.name,
      logo: college.logo,
      collegeUrl: college.collegeUrl,
      nirfRank: college.nirfRank,
      ownership: college.ownership,
      estYear: college.estdYear,
      state: college.state,
      city: college.city,
      category: college.category
    }));
  }

  pageInfo(): IPageData {
    return this.pageData;
  }

  locations(): IGeoLocation[] {
    return this.getLocationData();
  }

  coursesInfo(): ICourse[] {
    return this.courses;
  }

  sortBy(key: string): ICollege[] {
    return sortBy(this.collegeData, [key]);
  }

  filterBy(key: string, value: string): ICollege[] {
    return filter(this.collegeData, [key, value]);
  }

  getCheckBoxItem(key: any, dependancy?: SelelctedProps[]): ICheckboxItem[] {
    let items: ICheckboxItem[] = [];
    const idSet = new Set();

    switch (key) {
      case 'course':
        items = this.courses.map((c) => {
          return {
            id: String(c.courseId),
            label: c.courseName,
            checked: false,
            depended: ''
          };
        });
        break;
      case 'city':
        if (dependancy && dependancy.length > 0) {
          items = this.collegeData
            .filter((college) => {
              return dependancy.some((state) => state.id === college.state);
            })
            .map((c) => {
              const id = String(c[key as keyof ICollege])
                .replace(/\s+/g, '_')
                .toLowerCase();

              if (idSet.has(id)) {
                return null; // Skip this iteration
              }
              idSet.add(id);
              return {
                id: c[key as keyof ICollege],
                label: c[key as keyof ICollege],
                checked: false,
                depended:
                  dependancy.find((state) => replaceSpecialChar(state.label) === replaceSpecialChar(c.state))?.id || ''
              };
            })
            .filter((item): item is ICheckboxItem => item !== null);
        } else {
          items = this.collegeData
            .map((c) => {
              const id = String(c[key as keyof ICollege])
                .replace(/\s+/g, '_')
                .toLowerCase();

              if (idSet.has(id)) {
                return null; // Skip this iteration
              }
              idSet.add(id);
              return {
                id: c[key as keyof ICollege],
                label: c[key as keyof ICollege],
                checked: false
              };
            })
            .filter((item): item is ICheckboxItem => item !== null);
        }
        break;
      default:
        items = this.collegeData
          .map((c) => {
            const id = String(c[key as keyof ICollege])
              .replace(/\s+/g, '_')
              .toLowerCase();

            if (idSet.has(id)) {
              return null; // Skip this iteration
            }
            idSet.add(id);
            return {
              id: c[key as keyof ICollege],
              label: c[key as keyof ICollege],
              checked: false
            };
          })
          .filter((item): item is ICheckboxItem => item !== null);
        break;
    }
    /*switch (key) {
      case "ownership":
        items = this.collegeData
          .map((c) => {
            const id = c.ownership.replace(/\s+/g, "").toLowerCase();
            if (idSet.has(id)) {
              return null; // Skip this iteration
            }
            idSet.add(id);
            return {
              id,
              label: c.ownership,
              checked: false,
            };
          })
          .filter((item): item is ICheckboxItem => item !== null);
        break;
      case "state":
        items = this.collegeData
          .map((c) => {
            const id = c.state.replace(/\s+/g, "").toLowerCase();
            if (idSet.has(id)) {
              return null; // Skip this iteration
            }
            idSet.add(id);
            return {
              id,
              label: c.state,
              checked: false,
            };
          })
          .filter((item): item is ICheckboxItem => item !== null);
        break;
      case "city":
        items = this.collegeData.map((c) => {
          const id = c.city.replace(/\s+/g, "").toLowerCase();
            if (idSet.has(id)) {
              return null; // Skip this iteration
            }
            idSet.add(id);
          return {
            id,
            label: c.city,
            checked: false,
          };
        })
        .filter((item): item is ICheckboxItem => item !== null);
        break;
      case "course":
        items = this.courses.map((c) => {
          return {
            id: String(c.courseId),
            label: c.courseName,
            checked: false,
          };
        });
        break;
      case "category":
        items = this.collegeData.map((c) => {
          const id = c.category.replace(/\s+/g, "").toLowerCase();
          if (idSet.has(id)) {
            return null; // Skip this iteration
          }
          idSet.add(id);
          return {
            id,
            label: c.category,
            checked: false,
          };
        })
        .filter((item): item is ICheckboxItem => item !== null);
        break;
        /
    }*/
    return items;
  }
}

export default CollegeInfo;

import { makeObservable, observable, runInAction, action } from 'mobx';

class AppStore {

	universityData = [];
    loadErrorStatus = '';

	constructor() {
		makeObservable(this, {
		    universityData: observable,
		    loadErrorStatus: observable,
		    getUniversityData: action,
		    getUniversityDetails: action
		});
	}

    getUniversityData = async () => {
        try {
            const response = await fetch(
                'http://universities.hipolabs.com/search?country=canada', 
                { method: 'GET' }
            );
      
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            runInAction(() => {
                this.universityData = responseData.map((university, index) => {
                	return { ...university, key: index };
                });
                this.loadErrorStatus = '';
            });
        } catch (err) {
        	runInAction(() => {
                this.loadErrorStatus = err.message;
            });
        }
    };
    
    getUniversityDetails = (key) => {
    	return this.universityData[key];
    };
}
   
export default AppStore;

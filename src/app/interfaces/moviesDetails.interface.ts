export interface MoviesDetailResponse {
    id:      number;                      //por que no tiene esto en su response de details?
    results: Result[];
}

export interface Result {
    iso_639_1:    string;
    iso_3166_1:   string;
    name:         string;
    key:          string;
    site:         string;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: string;
    id:           string;
}

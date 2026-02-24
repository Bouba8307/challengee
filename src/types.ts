export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface Profession {
  id: string;
  title: string;
  description: string;
  images: string[];
  color: string;
}

export interface TrainingPath {
  id: string;
  title: string;
  duration: string;
  level: string;
  description: string;
}

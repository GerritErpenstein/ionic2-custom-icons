export interface DefaultConfig {
   templatePath?: string;
   fontTargetPath?: string;
   fontRelPath?: string;
   scssTargetPath?: string;
   scssRelPath?: string;
   debug?: boolean;
}

export interface Config extends DefaultConfig {
   iconSets: Array<IconSetConfig>;
}

export interface IconSetConfig {
   src: string;
   name: string;
   id: string;
}

export default interface ApiContextInterface {
  apiData: [] | null;
  fetchData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

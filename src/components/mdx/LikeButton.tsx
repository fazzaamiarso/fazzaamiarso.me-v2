import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Props = {
  ip: string;
  slug: string;
};

const likePost = async (data: Props) => {
  return await fetch("/api/like", { method: "POST", body: JSON.stringify(data) });
};

export const LikeButton = ({ ip, slug }: Props) => {
  const { data } = useQuery({
    queryKey: [`like-${slug}`],
    queryFn: async () => {
      const savedLikes = await fetch(`/api/like?slug=${slug}`, {
        method: "GET",
      });
      return await savedLikes.json();
    },
  });

  const likeMutation = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`like-${slug}`] });
    },
  });

  return (
    <button
      type='button'
      disabled={likeMutation.isLoading}
      onClick={() => {
        likeMutation.mutate({ ip, slug });
      }}
      className='disabled:opacity-50'>
      🔥 {data ? data.likes : 0}
    </button>
  );
};

export const LikeWrapper = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LikeButton {...props} />
    </QueryClientProvider>
  );
};

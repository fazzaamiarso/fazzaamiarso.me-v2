import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Props = {
  ip: string;
  slug: string;
  initialLikes: number;
};

const likePost = async (data: Omit<Props, "initialLikes">) => {
  return await fetch("/api/like", { method: "POST", body: JSON.stringify(data) });
};

export const LikeButton = ({ ip, slug, initialLikes }: Props) => {
  const { data } = useQuery({
    queryKey: [`like-${slug}`],
    queryFn: async () => {
      const savedLikes = await fetch(`/api/like?slug=${slug}&ip=${ip}`, {
        method: "GET",
      });
      return await savedLikes.json();
    },
    initialData: () => ({
      likes: initialLikes,
    }),
  });

  const likeMutation = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`like-${slug}`] });
    },
  });

  return (
    <div>
      <button
        type='button'
        disabled={likeMutation.isLoading}
        onClick={() => {
          likeMutation.mutate({ ip, slug });
        }}
        className='relative block overflow-hidden disabled:opacity-50'>
        <span className='inline-block'>🔥 {data ? data.likes : 0}</span>
      </button>
    </div>
  );
};

export const LikeWrapper = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LikeButton {...props} />
    </QueryClientProvider>
  );
};

import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
const queryClient = new QueryClient();

type Props = {
  ip: string;
  slug: string;
  initialLikes: number;
};

const translateVals = [
  "translate-y-full",
  "translate-y-[75%]",
  "translate-y-[60%]",
  "translate-y-[40%]",
  "translate-y-[20%]",
  "translate-y-[0%]",
];

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
        className='flex items-center gap-2  disabled:opacity-50'>
        <div className='group  relative overflow-hidden'>
          <div
            aria-hidden='true'
            className={clsx(
              translateVals[data?.likes ? data.likes : 0],
              "absolute -z-10 h-full w-full rounded-md bg-gradient-to-tl from-pink-400 to-pink-600 transition-all"
            )}></div>
          <svg
            className='aspect-square h-8 w-8 rounded-md'
            width='507'
            height='507'
            viewBox='0 0 507 507'
            fill='black'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M507 0H0V507H507V0ZM267.177 414.131C272.247 411.276 279.459 407.106 288.091 401.711C310.288 387.876 331.462 372.467 351.448 355.604C396.855 317.029 446 260.236 446 193.353C446 132.706 396.346 88 345.359 88C305.11 88 272.651 109.477 253 142.393C233.367 109.477 200.89 88 160.641 88C109.636 88 60 132.706 60 193.335C60 260.219 109.127 316.994 154.552 355.621C180.742 377.721 208.957 397.311 238.823 414.131C241.519 415.645 244.239 417.117 246.982 418.546C248.844 419.501 250.907 420 253 420C255.093 420 257.156 419.501 259.018 418.546H259.053C261.773 417.109 264.492 415.638 267.177 414.131Z'
              className='origin-center fill-gray-200 transition-all group-hover:scale-105'
            />
          </svg>
        </div>
        <span className='inline-block'>{data ? data.likes : 0}</span>
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
